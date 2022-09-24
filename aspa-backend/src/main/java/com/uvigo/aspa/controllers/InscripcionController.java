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
import com.uvigo.aspa.models.Atleta;
import com.uvigo.aspa.models.Inscripcion;
import com.uvigo.aspa.models.Prueba;
import com.uvigo.aspa.services.IAtletaService;
import com.uvigo.aspa.services.IInscripcionService;
import com.uvigo.aspa.services.IPruebaService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping(path = "/api/pruebas/{pruebaid}/inscripciones")
public class InscripcionController {

	@Autowired
	private IInscripcionService inscripcionService;
	@Autowired
	private IAtletaService atletaService;
	@Autowired
	private IPruebaService pruebaService;

	@GetMapping
	public ResponseEntity<Iterable<Inscripcion>> getAllInscripciones(@PathVariable Long pruebaid) {
		try {
			Iterable<Inscripcion> it = inscripcionService.findByPrueba(pruebaid);
			return new ResponseEntity<>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(path = "/confirmadas")
	public ResponseEntity<Iterable<Inscripcion>> getAllInscripcionesConfirmadas(@PathVariable Long pruebaid) {
		try {
			Iterable<Inscripcion> it = inscripcionService.findPresentedByPrueba(pruebaid);
			return new ResponseEntity<>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping
	public ResponseEntity<Inscripcion> add(@RequestAttribute("claims") final Claims claims,
			@RequestBody Inscripcion inscripcion, @PathVariable Long pruebaid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.ATLETA)) {
				// intentar guardar si existe la prueba y no ha finalizado
				final Prueba prueba = pruebaService.findById(pruebaid).get();
				if (prueba == null) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				} else if (prueba.isFinalizada()) {
					return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
				}
				// guardar solo si no existe una inscripcion con mismo atleta y ese pruebaid
				Inscripcion i = inscripcionService.findUnique(pruebaid, inscripcion.getAtleta().getLicencia());
				if (i != null) {
					return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
				} else {
					Atleta a = atletaService.findById(inscripcion.getAtleta().getIdatleta()).get();
					if (a != null) {
						inscripcion.setAtleta(a);
						Long dorsal = inscripcionService.findMaxDorsalByPrueba(pruebaid);
						dorsal = dorsal != null ? dorsal + 1 : 1;
						inscripcion.setDorsal(dorsal);
						inscripcion.setIdprueba(pruebaid);
						Inscripcion nuevaInscripcion = inscripcionService.create(inscripcion);
						return new ResponseEntity<Inscripcion>(nuevaInscripcion, HttpStatus.CREATED);
					} else {
						return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
					}
				}
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping(path = "/{inscripcionid}")
	public ResponseEntity<String> edit(@RequestAttribute("claims") final Claims claims,
			@RequestBody Inscripcion inscripcion, @PathVariable Long pruebaid, @PathVariable Long inscripcionid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				Optional<Inscripcion> i = inscripcionService.findById(inscripcionid);
				if (i.isPresent() && (i.get().getIdprueba() == pruebaid)) {
					if (i.get().isPresentado() != inscripcion.isPresentado()) {
						inscripcion.setIdinscripcion(inscripcionid);
						inscripcion.setIdprueba(pruebaid);
						inscripcionService.update(inscripcion);
					}
					return new ResponseEntity<>(HttpStatus.OK);
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

	@DeleteMapping(path = "/{inscripcionid}")
	public ResponseEntity<String> delete(@RequestAttribute("claims") final Claims claims, @PathVariable Long pruebaid,
			@PathVariable Long inscripcionid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.ATLETA)) {
				Optional<Inscripcion> inscripcion = inscripcionService.findById(inscripcionid);
				if (inscripcion.isPresent() && (inscripcion.get().getIdprueba() == pruebaid)) {
					this.inscripcionService.delete(inscripcion.get());
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

}
