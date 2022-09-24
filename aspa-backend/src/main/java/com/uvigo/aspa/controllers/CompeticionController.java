package com.uvigo.aspa.controllers;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uvigo.aspa.constants.Rol;
import com.uvigo.aspa.models.Competicion;
import com.uvigo.aspa.services.ICompeticionService;
import com.uvigo.aspa.services.IPruebaService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping(path = "/api")
public class CompeticionController {

	@Autowired
	private IPruebaService pruebaService;
	@Autowired
	private ICompeticionService competicionService;

	@GetMapping(path = "/competiciones")
	public ResponseEntity<Iterable<Competicion>> getAllCompeticiones(@RequestParam(required = false) String categoria) {
		try {
			Iterable<Competicion> it = competicionService.findAll();
//				Iterable<Competicion> it = competicionService.findPaginadas(PageRequest.of(0, 10));
			return new ResponseEntity<>(it, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(path = "/competiciones/filtradas")
	public ResponseEntity<Iterable<Competicion>> getFilteredCompeticiones(@RequestParam(required = false) Integer ano,
			@RequestParam(required = false) Integer mes) {
		try {
			Integer anoFin = ano;
			Integer mesFin = 1;
			if (mes == null || mes == 0) {
				mes = 1;
				anoFin = ano + 1;
			} else {
				mesFin = mes + 1;
			}
			Date fechaInicio = new SimpleDateFormat("yyyy-MM-dd").parse(ano + "-" + mes + "-01");
			Date fechaFin = new SimpleDateFormat("yyyy-MM-dd").parse(anoFin + "-" + mesFin + "-01");
			Iterable<Competicion> it = competicionService.findFiltradas(fechaInicio, fechaFin);
			return new ResponseEntity<Iterable<Competicion>>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(path = "/competiciones/hoy")
	public ResponseEntity<Iterable<Competicion>> getFilteredCompeticiones() {
		try {
			Iterable<Competicion> it = competicionService.findByDate(new Date());
			return new ResponseEntity<Iterable<Competicion>>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(path = "/competiciones/{competicionid}")
	public ResponseEntity<Competicion> getCompeticion(@PathVariable Long competicionid) {
		try {
			Optional<Competicion> competicion = competicionService.findById(competicionid);
			if (competicion.isPresent()) {
				return new ResponseEntity<Competicion>(competicion.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<Competicion>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(path = "/competiciones")
	public ResponseEntity<String> add(@RequestAttribute("claims") final Claims claims,
			@RequestBody Competicion competicion) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				competicionService.create(competicion);
				return new ResponseEntity<>(HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping(path = "/competiciones/{competicionid}")
	public ResponseEntity<String> edit(@RequestAttribute("claims") final Claims claims,
			@RequestBody Competicion competicion, @PathVariable Long competicionid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<Competicion> competicionVieja = competicionService.findById(competicionid);
				if (competicionVieja.isPresent()) {
					if (competicionVieja.get().getFecha() != competicion.getFecha()) {
						competicionVieja.get().getPruebas().forEach(p -> {
							p.setFecha(competicion.getFecha());
							pruebaService.update(p);
						});
					}
					competicionService.update(competicion);
					return new ResponseEntity<>(HttpStatus.OK);
				} else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@DeleteMapping(path = "/competiciones/{competicionid}")
	public ResponseEntity<String> delete(@RequestAttribute("claims") final Claims claims,
			@PathVariable Long competicionid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<Competicion> competicion = competicionService.findById(competicionid);
				if (competicion.isPresent()) {
					if (competicion.get().getPruebas().isEmpty()) {
						return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
					} else {
						competicionService.delete(competicion.get());
						return new ResponseEntity<>(HttpStatus.OK);
					}
				} else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
