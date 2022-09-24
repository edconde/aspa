package com.uvigo.aspa.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.uvigo.aspa.models.TipoPrueba;
import com.uvigo.aspa.repositories.TipoPruebaRepository;
import com.uvigo.aspa.services.ITipoPruebaService;

public class TipoPruebaService implements ITipoPruebaService {

	@Autowired
	TipoPruebaRepository tipoPruebaRepository;
	
	@Override
	public Optional<TipoPrueba> findById(Long resourceId) {
		return tipoPruebaRepository.findById(resourceId);
	}

	@Override
	public Iterable<TipoPrueba> findAll() {
		return tipoPruebaRepository.findAll();
	}

	@Override
	public TipoPrueba create(TipoPrueba resource) {
		return tipoPruebaRepository.save(resource);
	}

	@Override
	public TipoPrueba update(TipoPrueba resource) {
		return tipoPruebaRepository.save(resource);
	}

	@Override
	public void delete(TipoPrueba resource) {
		tipoPruebaRepository.delete(resource);
	}

	@Override
	public void deleteById(Long resourceId) {
		tipoPruebaRepository.deleteById(resourceId);
	}

	@Override
	public TipoPrueba findEqual(String disciplina, String categoria, String sexo) {
		return tipoPruebaRepository.findEqual(disciplina, categoria, sexo);
	}

}
