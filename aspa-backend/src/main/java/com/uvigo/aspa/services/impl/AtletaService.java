package com.uvigo.aspa.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.uvigo.aspa.models.Atleta;
import com.uvigo.aspa.repositories.AtletaRepository;
import com.uvigo.aspa.services.IAtletaService;

public class AtletaService implements IAtletaService {
	
	@Autowired
	AtletaRepository atletaRepository;

	@Override
	public Optional<Atleta> findById(Long resourceId) {
		return atletaRepository.findById(resourceId);
	}

	@Override
	public Iterable<Atleta> findAll() {
		return atletaRepository.findAll();
	}

	@Override
	public Atleta create(Atleta resource) {
		return atletaRepository.save(resource);
	}

	@Override
	public Atleta update(Atleta resource) {
		return atletaRepository.save(resource);
	}

	@Override
	public void delete(Atleta resource) {
		atletaRepository.delete(resource);
	}

	@Override
	public void deleteById(Long resourceId) {
		atletaRepository.deleteById(resourceId);
	}

	@Override
	public Atleta findByCredentials(String licencia, String password) {
		return atletaRepository.findByCredentials(licencia, password);
	}

	@Override
	public Atleta findByLicenciaOrDni(String licencia, String dni) {
		return atletaRepository.findByLicenciaOrDni(licencia, dni);
	}

	@Override
	public Atleta findByEmail(String email) {
		return atletaRepository.findByEmail(email);
	}

}
