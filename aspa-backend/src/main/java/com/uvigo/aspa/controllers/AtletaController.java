package com.uvigo.aspa.controllers;

import com.uvigo.aspa.constants.Rol;
import com.uvigo.aspa.models.Atleta;
import com.uvigo.aspa.services.IAtletaService;
import com.uvigo.aspa.utils.EmailUtils;
import com.uvigo.aspa.utils.PasswordGenerator;

import io.jsonwebtoken.Claims;

import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/atletas")
public class AtletaController {

	@Autowired
	private IAtletaService atletaService;

	@GetMapping
	public ResponseEntity<Iterable<Atleta>> getAllAtletas(@RequestAttribute("claims") final Claims claims) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				Iterable<Atleta> it = atletaService.findAll();
				return new ResponseEntity<>(it, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(path = "/{idatleta}")
	public ResponseEntity<Atleta> getAtleta(@RequestAttribute("claims") final Claims claims,
			@PathVariable Long idatleta) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<Atleta> atleta = atletaService.findById(idatleta);
				if (atleta.isPresent()) {
					return new ResponseEntity<Atleta>(atleta.get(), HttpStatus.OK);
				} else
					return new ResponseEntity<Atleta>(HttpStatus.NOT_FOUND);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping
	public ResponseEntity<String> add(@RequestAttribute("claims") final Claims claims, @RequestBody Atleta atleta) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				if (atletaService.findByEmail(atleta.getEmail()) != null) {
					return new ResponseEntity<>(HttpStatus.CONFLICT);
				} else {
					final String password = PasswordGenerator.getRandomPassword(8);
					atleta.setPassword(password);
					atletaService.create(atleta);
					EmailUtils.sendNewPasswordByMail(atleta.getEmail(), password, false);
					return new ResponseEntity<>(HttpStatus.OK);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping(path = "/{idatleta}")
	public ResponseEntity<String> edit(@RequestAttribute("claims") final Claims claims, @RequestBody Atleta atleta,
			@PathVariable Long idatleta) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<Atleta> oldAtleta = atletaService.findById(idatleta);
				if (!oldAtleta.isPresent()) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				} else {
					atleta.setPassword(oldAtleta.get().getPassword());
					atletaService.update(atleta);
					return new ResponseEntity<>(HttpStatus.OK);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping(path = "/{idatleta}")
	public ResponseEntity<String> delete(@RequestAttribute("claims") final Claims claims,
			@PathVariable Long idatleta) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<Atleta> atleta = atletaService.findById(idatleta);
				if (atleta.isPresent()) {
					atletaService.delete(atleta.get());
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
