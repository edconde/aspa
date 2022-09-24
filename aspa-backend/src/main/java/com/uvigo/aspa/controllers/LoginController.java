package com.uvigo.aspa.controllers;

import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uvigo.aspa.constants.Rol;
import com.uvigo.aspa.models.Atleta;
import com.uvigo.aspa.models.Usuario;
import com.uvigo.aspa.services.IAtletaService;
import com.uvigo.aspa.services.IUsuarioService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;

@RestController
@RequestMapping(path = "/api/token", produces = { MediaType.TEXT_PLAIN_VALUE })
public class LoginController {

	private static final String secret = "aspakey";
	private static final String subject = "Autenticación de usuario";
	@Autowired
	private IUsuarioService usuarioService;
	@Autowired
	private IAtletaService atletaService;

	@CrossOrigin
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/usuarios")
	public ResponseEntity<?> loginUsuario(@RequestParam String email, @RequestParam String password) {

		String jwtToken;
		Usuario u = usuarioService.findByCredentials(email, password);

		try {
			if (u != null) {
				jwtToken = Jwts.builder().setSubject(subject)
						.claim("email", u.getEmail())
						.claim("nombre", u.getNombre())
						.claim("rol", u.getRol())
						.claim("idusuario", u.getIdusuario())
						.setIssuedAt(new Date())
						.setExpiration(new Date(System.currentTimeMillis() + 604800000))
						.signWith(SignatureAlgorithm.HS256, TextCodec.BASE64.encode(secret))
						.compact();

				HashMap<String, String> body = new HashMap<>();
				body.put("token", jwtToken);
				return new ResponseEntity<>(body, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@CrossOrigin
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/atletas")
	public ResponseEntity<?> loginAtleta(@RequestParam String email, @RequestParam String password) {

		String jwtToken;
		Atleta a = atletaService.findByCredentials(email, password);

		try {
			if (a != null) {
				jwtToken = Jwts.builder().setSubject(subject)
						.claim("nombre", a.getNombre())
						.claim("licencia", a.getLicencia())
						.claim("fechaNacimiento", a.getFechaNacimiento())
						.claim("sexo", a.isSexo())
						.claim("rol", Rol.ATLETA)
						.claim("idatleta", a.getIdatleta())
						.setIssuedAt(new Date())
						.setExpiration(new Date(System.currentTimeMillis() + 604800000))
						.signWith(SignatureAlgorithm.HS256, TextCodec.BASE64.encode(secret))
						.compact();

				HashMap<String, String> body = new HashMap<>();
				body.put("token", jwtToken);
				return new ResponseEntity<>(body, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
