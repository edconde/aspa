package com.uvigo.aspa.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uvigo.aspa.constants.Rol;
import com.uvigo.aspa.models.TipoPrueba;
import com.uvigo.aspa.services.IPruebaService;
import com.uvigo.aspa.services.ITipoPruebaService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping(path = "/api/tipos-prueba")
public class TipoPruebaController {

	@Autowired
	private ITipoPruebaService tipoPruebaService;
	@Autowired
	private IPruebaService pruebaService;

	@GetMapping
	public ResponseEntity<Iterable<TipoPrueba>> getAllTiposPrueba() {
		try {
				Iterable<TipoPrueba> it = tipoPruebaService.findAll();
				return new ResponseEntity<>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping
	public ResponseEntity<String> add(@RequestAttribute("claims") final Claims claims,
			@RequestBody TipoPrueba tipoPrueba) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				if (tipoPruebaService.findEqual(tipoPrueba.getDisciplina(), tipoPrueba.getCategoria(),
						tipoPrueba.getSexo()) != null) {
					return new ResponseEntity<>(HttpStatus.CONFLICT);
				}
				tipoPruebaService.create(tipoPrueba);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping(path = "/{tipoPruebaid}")
	public ResponseEntity<String> delete(@RequestAttribute("claims") final Claims claims,
			@PathVariable Long tipoPruebaid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<TipoPrueba> tipoPrueba = tipoPruebaService.findById(tipoPruebaid);
				if (tipoPrueba.isPresent()) {
					boolean hasPruebas = this.pruebaService.countByTipoPrueba(tipoPruebaid) > 0;
					if (hasPruebas) {
						return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
					} else {
						this.tipoPruebaService.delete(tipoPrueba.get());
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
