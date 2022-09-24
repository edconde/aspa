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
import com.uvigo.aspa.models.MarcaNs;
import com.uvigo.aspa.models.Prueba;
import com.uvigo.aspa.services.IMarcaNsService;
import com.uvigo.aspa.services.IPruebaService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping(path = "/api/pruebas/{pruebaid}/marcas/ns")
public class MarcaNsController {

	@Autowired
	private IMarcaNsService marcaNsService;
	@Autowired
	private IPruebaService pruebaService;

	@GetMapping
	public ResponseEntity<Iterable<MarcaNs>> getAllMarcasNs(@PathVariable Long pruebaid) {
		try {
			Iterable<MarcaNs> it = marcaNsService.findByIdprueba(pruebaid);
			return new ResponseEntity<>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping
	public ResponseEntity<String> edit(@RequestAttribute("claims") final Claims claims, @PathVariable Long pruebaid,
			@RequestBody MarcaNs marcaNs) {
		try {
			Optional<Prueba> prueba = pruebaService.findById(pruebaid);
			if (prueba.isPresent()) {
				marcaNs.getId().setIdprueba(pruebaid);
				if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
					marcaNsService.update(marcaNs);
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

	@PostMapping
	public ResponseEntity<String> createPassedMarks(@RequestAttribute("claims") final Claims claims,
			@PathVariable Long pruebaid, @RequestBody Iterable<MarcaNs> marcasNs) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				Optional<Prueba> prueba = pruebaService.findById(pruebaid);
				if (prueba.isPresent()) {
					for (MarcaNs m : marcasNs) {
						m.getId().setIdprueba(pruebaid);
					}
					for (MarcaNs m : marcasNs) {
						marcaNsService.create(m);
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

	@DeleteMapping
	public ResponseEntity<String> delete(@RequestAttribute("claims") final Claims claims, @PathVariable Long pruebaid,
			@RequestBody Iterable<MarcaNs> marcasNs) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				Optional<Prueba> prueba = pruebaService.findById(pruebaid);
				if (prueba.isPresent()) {
					for (MarcaNs m : marcasNs) {
						m.getId().setIdprueba(pruebaid);
					}
					for (MarcaNs m : marcasNs) {
						Optional<MarcaNs> mo = marcaNsService.findById(m.getId());
						if (mo.isPresent()) {
							this.marcaNsService.delete(mo.get());
						}
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

}
