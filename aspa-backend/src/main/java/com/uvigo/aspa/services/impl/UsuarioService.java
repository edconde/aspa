package com.uvigo.aspa.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.uvigo.aspa.models.Usuario;
import com.uvigo.aspa.repositories.UsuarioRepository;
import com.uvigo.aspa.services.IUsuarioService;

public class UsuarioService implements IUsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Override
	public Optional<Usuario> findById(Long resourceId) {
		return usuarioRepository.findById(resourceId);
	}

	@Override
	public Iterable<Usuario> findAll() {
		return usuarioRepository.findAll();
	}

	@Override
	public Usuario create(Usuario resource) {
		return usuarioRepository.save(resource);
	}

	@Override
	public Usuario update(Usuario resource) {
		return usuarioRepository.save(resource);
	}

	@Override
	public void delete(Usuario resource) {
		usuarioRepository.delete(resource);
	}

	@Override
	public void deleteById(Long resourceId) {
		usuarioRepository.deleteById(resourceId);
	}

	@Override
	public Usuario findByCredentials(String email, String password) {
		return usuarioRepository.findByCredentials(email, password);
	}

	@Override
	public Usuario findByEmailOrDni(String email, String dni) {
		return usuarioRepository.findByEmailOrDni(email, dni);
	}

	@Override
	public Usuario findBySessionInfo(String email, String rol) {
		return usuarioRepository.findBySessionInfo(email, rol);
	}

	@Override
	public Usuario findByEmail(String email) {
		return usuarioRepository.findByEmail(email);
	}

}
