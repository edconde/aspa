package com.uvigo.aspa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uvigo.aspa.models.Atleta;
import com.uvigo.aspa.models.Usuario;
import com.uvigo.aspa.services.IAtletaService;
import com.uvigo.aspa.services.IUsuarioService;
import com.uvigo.aspa.utils.EmailUtils;
import com.uvigo.aspa.utils.PasswordGenerator;

@RestController
@RequestMapping(path = "/api/password/reset")
public class PasswordResetController {

	@Autowired
	private IUsuarioService usuarioService;
	@Autowired
	private IAtletaService atletaService;

	@CrossOrigin
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/usuarios")
	public ResponseEntity<?> resetUsuarioPassword(@RequestParam String email) {
		try {
			final Usuario usuario = usuarioService.findByEmail(email);
			if (usuario != null) {
				String newPassword = PasswordGenerator.getRandomPassword(8);
				usuario.setPassword(newPassword);
				usuarioService.update(usuario);
				EmailUtils.sendNewPasswordByMail(email, newPassword, true);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/atletas")
	public ResponseEntity<?> resetAtletaPassword(@RequestParam String email) {
		try {
			final Atleta atleta = atletaService.findByEmail(email);
			if (atleta != null) {
				String newPassword = PasswordGenerator.getRandomPassword(8);
				atleta.setPassword(newPassword);
				atletaService.update(atleta);
				EmailUtils.sendNewPasswordByMail(email, newPassword, true);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
