package com.uvigo.aspa.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.uvigo.aspa.models.Prueba;
import com.uvigo.aspa.repositories.PruebaRepository;
import com.uvigo.aspa.services.IPruebaService;

public class PruebaService implements IPruebaService {

	@Autowired
	PruebaRepository pruebaRepository;
	
	@Override
	public Optional<Prueba> findById(Long resourceId) {
		return pruebaRepository.findById(resourceId);
	}

	@Override
	public Iterable<Prueba> findAll() {
		return pruebaRepository.findAll();
	}

	@Override
	public Prueba create(Prueba resource) {
		return pruebaRepository.save(resource);
	}

	@Override
	public Prueba update(Prueba resource) {
		return pruebaRepository.save(resource);
	}

	@Override
	public void delete(Prueba resource) {
		pruebaRepository.delete(resource);
	}

	@Override
	public void deleteById(Long resourceId) {
		pruebaRepository.deleteById(resourceId);
	}

	@Override
	public Iterable<Prueba> findByCompetition(Long competicionid) {
		return pruebaRepository.findByCompetition(competicionid);
	}

	@Override
	public Prueba findByCompetitionAndType(Long idtipoprueba, Long competicionid) {
		return pruebaRepository.findByCompetitionAndType(idtipoprueba, competicionid);
	}

	@Override
	public Integer countByCompetition(Long competicionid) {
		return pruebaRepository.countByCompetition(competicionid);
	}

	@Override
	public Integer countByTipoPrueba(Long tipoPruebaid) {
		return pruebaRepository.countByTipoPrueba(tipoPruebaid);
	}

}
