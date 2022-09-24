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
import com.uvigo.aspa.models.Clasificacion;
import com.uvigo.aspa.models.Prueba;
import com.uvigo.aspa.services.IClasificacionService;
import com.uvigo.aspa.services.IPruebaService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping(path = "/api")
public class ClasificacionController {

	@Autowired
	private IClasificacionService clasificacionService;
	@Autowired
	private IPruebaService pruebaService;

	@GetMapping(path = "/competiciones/{competicionid}/clasificaciones")
	public ResponseEntity<Iterable<Clasificacion>> getByCompeticion(@PathVariable Long competicionid) {
		try {
			Iterable<Clasificacion> it = clasificacionService.findByCompetition(competicionid);
			return new ResponseEntity<>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(path = "/pruebas/{pruebaid}/clasificaciones")
	public ResponseEntity<Iterable<Clasificacion>> getByPrueba(@PathVariable Long pruebaid) {
		try {
			Iterable<Clasificacion> it = clasificacionService.findByIdprueba(pruebaid);
			return new ResponseEntity<>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	@PostMapping(path = "/pruebas/{pruebaid}/clasificaciones")
//	public ResponseEntity<String> add(@RequestAttribute("claims") final Claims claims,
//			@RequestBody Clasificacion clasificacion, @PathVariable Long pruebaid) {
//		try {
//			if (claims.get("rol").equals(Rol.ADMIN)) {
//				// guardar solo si no existe una clasificacion con mismo atleta y ese pruebaid
//				Clasificacion m = clasificacionService.findUnique(pruebaid, clasificacion.getAtleta());
//				if (m != null) {
//					return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
//				} else {
//					clasificacion.setIdprueba(pruebaid);
//					clasificacionService.create(clasificacion);
//					return new ResponseEntity<>(HttpStatus.CREATED);
//				}
//			} else {
//				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
//			}
//		} catch (Exception e) {
//			System.out.println(e); // TODO: remove
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

	@PutMapping(path = "/pruebas/{pruebaid}/clasificacion")
	public ResponseEntity<String> edit(@RequestAttribute("claims") final Claims claims, @PathVariable Long pruebaid,
			@RequestBody Clasificacion clasificacion) {
		try {
			Optional<Prueba> prueba = pruebaService.findById(pruebaid);
			if (prueba.isPresent()) {
				clasificacion.getId().setIdprueba(pruebaid);
				if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
					clasificacionService.update(clasificacion);
					return new ResponseEntity<>(HttpStatus.OK);
				} else {
					return new ResponseEntity<>(HttpStatus.FORBIDDEN);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping(path = "/pruebas/{pruebaid}/clasificaciones")
	public ResponseEntity<String> editAllOfPrueba(@RequestAttribute("claims") final Claims claims,
			@PathVariable Long pruebaid, @RequestBody Iterable<Clasificacion> clasificaciones) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				Optional<Prueba> prueba = pruebaService.findById(pruebaid);
				if (prueba.isPresent()) {
					boolean updateClasification = true;
					for (Clasificacion c : clasificaciones) {
						if (c.getId().getIdprueba() != pruebaid) {
							updateClasification = false;
						}
					}
					if (updateClasification) {
						for (Clasificacion c : clasificaciones) {
							clasificacionService.update(c);
						}
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

	@DeleteMapping(path = "/pruebas/{pruebaid}/clasificacion")
	public ResponseEntity<String> delete(@RequestAttribute("claims") final Claims claims, @PathVariable Long pruebaid,
			@RequestBody Clasificacion clasificacion) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				clasificacion.getId().setIdprueba(pruebaid);
				Optional<Clasificacion> c = clasificacionService.findById(clasificacion.getId());
				if (c.isPresent()) {
					this.clasificacionService.delete(c.get());
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
