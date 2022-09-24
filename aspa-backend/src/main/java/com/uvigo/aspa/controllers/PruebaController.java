package com.uvigo.aspa.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.uvigo.aspa.constants.Rol;
import com.uvigo.aspa.models.Competicion;
import com.uvigo.aspa.models.Prueba;
import com.uvigo.aspa.services.ICompeticionService;
import com.uvigo.aspa.services.IPruebaService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping(path = "/api/competiciones/{competicionid}/pruebas")
public class PruebaController {

	@Autowired
	private IPruebaService pruebaService;
	@Autowired
	private ICompeticionService competicionService;

	@GetMapping
	public ResponseEntity<Iterable<Prueba>> getAllPruebasByCompetition(@PathVariable Long competicionid) {
		try {
			Iterable<Prueba> it = pruebaService.findByCompetition(competicionid);
			return new ResponseEntity<>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(path = "/{pruebaid}")
	public ResponseEntity<Prueba> getPrueba(@PathVariable Long competicionid, @PathVariable Long pruebaid) {
		try {
			Prueba p = pruebaService.findById(pruebaid).get();
			return new ResponseEntity<>(p, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping
	public ResponseEntity<String> add(@RequestAttribute("claims") final Claims claims, @RequestBody Prueba prueba,
			@PathVariable Long competicionid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Competicion competicion = competicionService.findById(competicionid).get();
				prueba.setCompeticion(competicion);
				pruebaService.create(prueba);
				return new ResponseEntity<>(HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping(path = "/{pruebaid}")
	public ResponseEntity<String> edit(@RequestAttribute("claims") final Claims claims, @RequestBody Prueba prueba,
			@PathVariable Long competicionid, @PathVariable Long pruebaid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<Prueba> p = pruebaService.findById(prueba.getIdprueba());
				if (p.isPresent()) {
					if (p.get().getCompeticion().getIdcompeticion() == competicionid) {
						Competicion competicion = competicionService.findById(competicionid).get();
						prueba.setCompeticion(competicion);
						pruebaService.update(prueba);
						return new ResponseEntity<>(HttpStatus.OK);
					} else {
						return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
					}
				} else {
					return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@DeleteMapping(path = "/{pruebaid}")
	public ResponseEntity<String> delete(@RequestAttribute("claims") final Claims claims,
			@PathVariable Long competicionid, @PathVariable Long pruebaid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<Prueba> prueba = pruebaService.findById(pruebaid);
				if (prueba.isPresent()) {
					if (prueba.get().getCompeticion().getIdcompeticion() == competicionid) {
						pruebaService.delete(prueba.get());
						return new ResponseEntity<>(HttpStatus.OK);
					} else {
						return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
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
