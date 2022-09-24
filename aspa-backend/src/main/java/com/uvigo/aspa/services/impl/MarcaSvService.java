package com.uvigo.aspa.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.uvigo.aspa.models.MarcaSv;
import com.uvigo.aspa.models.MarcaSvPK;
import com.uvigo.aspa.repositories.MarcaSvRepository;
import com.uvigo.aspa.services.IMarcaSvService;

public class MarcaSvService implements IMarcaSvService {

	@Autowired
	MarcaSvRepository marcaSvRepository;
	
	@Override
	public Optional<MarcaSv> findById(MarcaSvPK resourceId) {
		return marcaSvRepository.findById(resourceId);
	}

	@Override
	public Iterable<MarcaSv> findAll() {
		return marcaSvRepository.findAll();
	}

	@Override
	public MarcaSv create(MarcaSv resource) {
		return marcaSvRepository.save(resource);
	}

	@Override
	public MarcaSv update(MarcaSv resource) {
		return marcaSvRepository.save(resource);
	}

	@Override
	public void delete(MarcaSv resource) {
		marcaSvRepository.delete(resource);
	}

	@Override
	public void deleteById(MarcaSvPK resourceId) {
		marcaSvRepository.deleteById(resourceId);
	}

	@Override
	public Iterable<MarcaSv> findByIdprueba(Long pruebaid) {
		return marcaSvRepository.findByIdIdprueba(pruebaid);
	}

}
