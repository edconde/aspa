package com.uvigo.aspa.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.uvigo.aspa.models.AlturaPrueba;
import com.uvigo.aspa.models.AlturaPruebaPK;
import com.uvigo.aspa.repositories.AlturaPruebaRepository;
import com.uvigo.aspa.services.IAlturaPruebaService;

public class AlturaPruebaService implements IAlturaPruebaService {

	@Autowired
	AlturaPruebaRepository alturaPruebaRepository;

	@Override
	public Optional<AlturaPrueba> findById(AlturaPruebaPK resourceId) {
		return alturaPruebaRepository.findById(resourceId);
	}

	@Override
	public Iterable<AlturaPrueba> findAll() {
		return alturaPruebaRepository.findAll();
	}

	@Override
	public AlturaPrueba create(AlturaPrueba resource) {
		return alturaPruebaRepository.save(resource);
	}

	@Override
	public AlturaPrueba update(AlturaPrueba resource) {
		return alturaPruebaRepository.save(resource);
	}

	@Override
	public void delete(AlturaPrueba resource) {
		alturaPruebaRepository.delete(resource);
	}

	@Override
	public void deleteById(AlturaPruebaPK resourceId) {
		alturaPruebaRepository.deleteById(resourceId);
	}

	@Override
	public Iterable<AlturaPrueba> findByIdprueba(Long pruebaid) {
		return alturaPruebaRepository.findByIdIdprueba(pruebaid);
	}

	@Override
	public Integer numAlturas(Long pruebaid) {
		return alturaPruebaRepository.numAlturas(pruebaid);
	}

	@Override
	public Integer getMaxIdaltura(Long pruebaid) {
		return alturaPruebaRepository.selectMaxIdaltura(pruebaid);
	}
}
