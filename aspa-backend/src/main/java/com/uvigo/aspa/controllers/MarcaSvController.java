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
import com.uvigo.aspa.models.MarcaSv;
import com.uvigo.aspa.models.Prueba;
import com.uvigo.aspa.services.IMarcaSvService;
import com.uvigo.aspa.services.IPruebaService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping(path = "/api/pruebas/{pruebaid}/marcas/sv")
public class MarcaSvController {

	@Autowired
	private IMarcaSvService marcaSvService;
	@Autowired
	private IPruebaService pruebaService;

	@GetMapping
	public ResponseEntity<Iterable<MarcaSv>> getAllMarcasNs(@PathVariable Long pruebaid) {
		try {
			Iterable<MarcaSv> it = marcaSvService.findByIdprueba(pruebaid);
			return new ResponseEntity<>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	@PostMapping
//	public ResponseEntity<String> add(@RequestAttribute("claims") final Claims claims,
//			@RequestBody MarcaSv marcaSv, @PathVariable Long pruebaid) {
//		try {
//			if (claims.get("rol").equals(Rol.ADMIN)) {
//				// guardar solo si no existe una marcaSv con mismo atleta y ese pruebaid
//				MarcaSv m = marcaSvService.findUnique(pruebaid, marcaSv.getAtleta());
//				if (m != null) {
//					return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
//				} else {
//					marcaSv.setIdprueba(pruebaid);
//					marcaSvService.create(marcaSv);
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

	@PutMapping
	public ResponseEntity<String> edit(@RequestAttribute("claims") final Claims claims, @PathVariable Long pruebaid,
			@RequestBody MarcaSv marcaSv) {
		try {
			Optional<Prueba> prueba = pruebaService.findById(pruebaid);
			if (prueba.isPresent()) {
				marcaSv.getId().setIdprueba(pruebaid);
				if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
					marcaSvService.update(marcaSv);
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

	@DeleteMapping
	public ResponseEntity<String> delete(@RequestAttribute("claims") final Claims claims, @PathVariable Long pruebaid,
			@RequestBody Iterable<MarcaSv> marcasSv) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				Optional<Prueba> prueba = pruebaService.findById(pruebaid);
				if (prueba.isPresent()) {
					for (MarcaSv m : marcasSv) {
						m.getId().setIdprueba(pruebaid);
					}
					for (MarcaSv m : marcasSv) {
						Optional<MarcaSv> mo = marcaSvService.findById(m.getId());
						if (mo.isPresent()) {
							this.marcaSvService.delete(mo.get());
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
