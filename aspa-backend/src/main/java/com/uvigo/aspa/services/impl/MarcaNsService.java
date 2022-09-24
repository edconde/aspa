package com.uvigo.aspa.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.uvigo.aspa.models.MarcaNs;
import com.uvigo.aspa.models.MarcaNsPK;
import com.uvigo.aspa.repositories.MarcaNsRepository;
import com.uvigo.aspa.services.IMarcaNsService;

public class MarcaNsService implements IMarcaNsService {

	@Autowired
	MarcaNsRepository marcaNsRepository;
	
	@Override
	public Optional<MarcaNs> findById(MarcaNsPK resourceId) {
		return marcaNsRepository.findById(resourceId);
	}

	@Override
	public Iterable<MarcaNs> findAll() {
		return marcaNsRepository.findAll();
	}

	@Override
	public MarcaNs create(MarcaNs resource) {
		return marcaNsRepository.save(resource);
	}

	@Override
	public MarcaNs update(MarcaNs resource) {
		return marcaNsRepository.save(resource);
	}

	@Override
	public void delete(MarcaNs resource) {
		marcaNsRepository.delete(resource);
	}

	@Override
	public void deleteById(MarcaNsPK resourceId) {
		marcaNsRepository.deleteById(resourceId);
	}

	@Override
	public Iterable<MarcaNs> findByIdprueba(Long pruebaid) {
		return marcaNsRepository.findByIdIdprueba(pruebaid);
	}

}
