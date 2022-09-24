package com.uvigo.aspa.controllers;

import java.util.ArrayList;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uvigo.aspa.constants.Rol;
import com.uvigo.aspa.models.AlturaPrueba;
import com.uvigo.aspa.models.AlturaPruebaPK;
import com.uvigo.aspa.models.Prueba;
import com.uvigo.aspa.services.IAlturaPruebaService;
import com.uvigo.aspa.services.IPruebaService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping(path = "/api/pruebas/{pruebaid}/alturas")
public class AlturaPruebaController {

	@Autowired
	private IAlturaPruebaService alturaPruebaService;
	@Autowired
	private IPruebaService pruebaService;

	@GetMapping
	public ResponseEntity<Iterable<AlturaPrueba>> getAllAlturas(@PathVariable Long pruebaid) {
		try {
			Iterable<AlturaPrueba> it = alturaPruebaService.findByIdprueba(pruebaid);
			return new ResponseEntity<>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping
	public ResponseEntity<String> create(@RequestAttribute("claims") final Claims claims, @PathVariable Long pruebaid,
			@RequestParam Double altura) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				Optional<Prueba> prueba = pruebaService.findById(pruebaid);
				if (prueba.isPresent()) {
					AlturaPrueba alturaPrueba = new AlturaPrueba();
					alturaPrueba.setAltura(altura);
					boolean hasAlturas = alturaPruebaService.numAlturas(pruebaid) > 0;
					int idaltura = hasAlturas ? alturaPruebaService.getMaxIdaltura(pruebaid) + 1 : 1;
					AlturaPruebaPK alturaPruebaPK = new AlturaPruebaPK(pruebaid, new Long(idaltura));
					alturaPrueba.setId(alturaPruebaPK);
					alturaPruebaService.create(alturaPrueba);
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

	@PostMapping(path = "/multiple")
	public ResponseEntity<?> create(@RequestAttribute("claims") final Claims claims, @PathVariable Long pruebaid,
			@RequestBody Iterable<Double> alturas) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				Optional<Prueba> prueba = pruebaService.findById(pruebaid);
				if (prueba.isPresent()) {
					List<AlturaPrueba> listAlturas = new ArrayList<AlturaPrueba>();
					for (Double altura : alturas) {
						AlturaPrueba alturaPrueba = new AlturaPrueba();
						alturaPrueba.setAltura(altura);
						boolean hasAlturas = alturaPruebaService.numAlturas(pruebaid) > 0;
						int idaltura = hasAlturas ? alturaPruebaService.getMaxIdaltura(pruebaid) + 1 : 1;
						AlturaPruebaPK alturaPruebaPK = new AlturaPruebaPK(pruebaid, new Long(idaltura));
						alturaPrueba.setId(alturaPruebaPK);
						alturaPruebaService.create(alturaPrueba);
						listAlturas.add(alturaPrueba);
					}
					return new ResponseEntity<>(listAlturas, HttpStatus.OK);
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

	@PutMapping
	public ResponseEntity<String> edit(@RequestAttribute("claims") final Claims claims, @PathVariable Long pruebaid,
			@RequestParam Long idaltura, @RequestParam Double altura) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				AlturaPrueba alturaPrueba = new AlturaPrueba();
				AlturaPruebaPK alturaPk = new AlturaPruebaPK(pruebaid, idaltura);
				alturaPrueba.setId(alturaPk);
				Optional<AlturaPrueba> alturaPruebaO = alturaPruebaService.findById(alturaPrueba.getId());
				if (alturaPruebaO.isPresent()) {
					alturaPrueba.setAltura(altura);
					alturaPruebaService.update(alturaPrueba);
					return new ResponseEntity<>(HttpStatus.OK);
				} else {
					return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping
	public ResponseEntity<String> delete(@RequestAttribute("claims") final Claims claims, @PathVariable Long pruebaid,
			@RequestParam Long idaltura) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				AlturaPrueba alturaPrueba = new AlturaPrueba();
				AlturaPruebaPK alturaPk = new AlturaPruebaPK(pruebaid, idaltura);
				alturaPrueba.setId(alturaPk);
				Optional<AlturaPrueba> m = alturaPruebaService.findById(alturaPrueba.getId());
				if (m.isPresent() && (m.get().getId().getIdprueba() == pruebaid)) {
					this.alturaPruebaService.delete(m.get());
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
