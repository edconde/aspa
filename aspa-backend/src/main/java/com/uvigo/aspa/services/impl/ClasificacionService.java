package com.uvigo.aspa.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.uvigo.aspa.models.Clasificacion;
import com.uvigo.aspa.models.ClasificacionPK;
import com.uvigo.aspa.repositories.ClasificacionRepository;
import com.uvigo.aspa.services.IClasificacionService;

public class ClasificacionService implements IClasificacionService {
	
	@Autowired
	ClasificacionRepository clasificacionRepository;

	@Override
	public Optional<Clasificacion> findById(ClasificacionPK resourceId) {
		return clasificacionRepository.findById(resourceId);
	}

	@Override
	public Iterable<Clasificacion> findAll() {
		return clasificacionRepository.findAll();
	}

	@Override
	public Clasificacion create(Clasificacion resource) {
		return clasificacionRepository.save(resource);
	}

	@Override
	public Clasificacion update(Clasificacion resource) {
		return clasificacionRepository.save(resource);
	}

	@Override
	public void delete(Clasificacion resource) {
		clasificacionRepository.delete(resource);
	}

	@Override
	public void deleteById(ClasificacionPK resourceId) {
		clasificacionRepository.deleteById(resourceId);
	}

	@Override
	public Iterable<Clasificacion> findByIdprueba(Long pruebaid) {
		return clasificacionRepository.findByIdIdprueba(pruebaid);
	}

	@Override
	public Iterable<Clasificacion> findByCompetition(Long competicionid) {
		return clasificacionRepository.findByCompetition(competicionid);
	}

}
