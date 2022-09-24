package com.uvigo.aspa.controllers;

import com.uvigo.aspa.constants.Rol;
import com.uvigo.aspa.models.Club;
import com.uvigo.aspa.services.IClubService;

import io.jsonwebtoken.Claims;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/clubes")
public class ClubController {

	@Autowired
	private IClubService clubService;

	@GetMapping
	public ResponseEntity<Iterable<Club>> getAllClubs() {
		try {
			Iterable<Club> it = clubService.findAll();
			return new ResponseEntity<>(it, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(path = "/{idclub}")
	public ResponseEntity<Club> getClub(@PathVariable Long idclub) {
		try {
			Optional<Club> club = clubService.findById(idclub);
			if (club.isPresent()) {
				return new ResponseEntity<Club>(club.get(), HttpStatus.OK);
			} else
				return new ResponseEntity<Club>(HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping
	public ResponseEntity<String> add(@RequestAttribute("claims") final Claims claims, @RequestBody Club club) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				if (clubService.findByLicenciaOrNombre(club.getLicencia(), club.getNombre()) != null) {
					return new ResponseEntity<>(HttpStatus.CONFLICT);
				}
				clubService.create(club);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping(path = "/{idclub}")
	public ResponseEntity<String> edit(@RequestAttribute("claims") final Claims claims, @RequestBody Club club,
			@PathVariable Long idclub) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				if (clubService.findById(idclub) == null) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
				clubService.update(club);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping(path = "/{idclub}")
	public ResponseEntity<String> delete(@RequestAttribute("claims") final Claims claims, @PathVariable Long idclub) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<Club> club = clubService.findById(idclub);
				if (club.isPresent()) {
					clubService.delete(club.get());
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
