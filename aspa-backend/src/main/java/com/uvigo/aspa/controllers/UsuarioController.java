package com.uvigo.aspa.controllers;

import com.uvigo.aspa.constants.Rol;
import com.uvigo.aspa.models.Atleta;
import com.uvigo.aspa.models.Usuario;
import com.uvigo.aspa.services.IUsuarioService;
import com.uvigo.aspa.utils.EmailUtils;
import com.uvigo.aspa.utils.PasswordGenerator;

import io.jsonwebtoken.Claims;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/usuarios")
public class UsuarioController {

	@Autowired
	private IUsuarioService usuarioService;

	@GetMapping
	public ResponseEntity<Iterable<Usuario>> getAllUsuarios(@RequestAttribute("claims") final Claims claims) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN) || claims.get("rol").equals(Rol.JUEZ)) {
				Iterable<Usuario> it = usuarioService.findAll();
				return new ResponseEntity<>(it, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(path = "/{usuarioid}")
	public ResponseEntity<Usuario> getUsuario(@RequestAttribute("claims") final Claims claims,
			@PathVariable Long usuarioid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<Usuario> usuario = usuarioService.findById(usuarioid);
				if (usuario.isPresent()) {
					return new ResponseEntity<Usuario>(usuario.get(), HttpStatus.OK);
				} else
					return new ResponseEntity<Usuario>(HttpStatus.NOT_FOUND);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping
	public ResponseEntity<String> add(@RequestAttribute("claims") final Claims claims, @RequestBody Usuario usuario) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				if (usuarioService.findByEmail(usuario.getEmail()) != null) {
					return new ResponseEntity<>(HttpStatus.CONFLICT);
				} else {
					final String password = PasswordGenerator.getRandomPassword(8);
					usuario.setPassword(password);
					usuarioService.create(usuario);
					EmailUtils.sendNewPasswordByMail(usuario.getEmail(), password, false);
					return new ResponseEntity<>(HttpStatus.OK);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping(path = "/{usuarioid}")
	public ResponseEntity<String> edit(@RequestAttribute("claims") final Claims claims, @RequestBody Usuario usuario,
			@PathVariable Long usuarioid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<Usuario> oldUsuario = usuarioService.findById(usuarioid);
				if (!oldUsuario.isPresent()) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				} else {
					usuario.setPassword(oldUsuario.get().getPassword());
					usuarioService.update(usuario);
					return new ResponseEntity<>(HttpStatus.OK);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping(path = "/{usuarioid}")
	public ResponseEntity<String> delete(@RequestAttribute("claims") final Claims claims,
			@PathVariable Long usuarioid) {
		try {
			if (claims.get("rol").equals(Rol.ADMIN)) {
				Optional<Usuario> usuario = usuarioService.findById(usuarioid);
				if (usuario.isPresent()) {
					usuarioService.delete(usuario.get());
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
