package com.uvigo.aspa.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.uvigo.aspa.models.Inscripcion;
import com.uvigo.aspa.repositories.InscripcionRepository;
import com.uvigo.aspa.services.IInscripcionService;

public class InscripcionService implements IInscripcionService {

	@Autowired
	InscripcionRepository inscripcionRepository;
	
	@Override
	public Optional<Inscripcion> findById(Long resourceId) {
		return inscripcionRepository.findById(resourceId);
	}

	@Override
	public Iterable<Inscripcion> findAll() {
		return inscripcionRepository.findAll();
	}

	@Override
	public Inscripcion create(Inscripcion resource) {
		return inscripcionRepository.save(resource);
	}

	@Override
	public Inscripcion update(Inscripcion resource) {
		return inscripcionRepository.save(resource);
	}

	@Override
	public void delete(Inscripcion resource) {
		inscripcionRepository.delete(resource);
	}

	@Override
	public void deleteById(Long resourceId) {
		inscripcionRepository.deleteById(resourceId);
	}

	@Override
	public Iterable<Inscripcion> findByPrueba(Long pruebaid) {
		return inscripcionRepository.findByPrueba(pruebaid);
	}

	@Override
	public Iterable<Inscripcion> findPresentedByPrueba(Long pruebaid) {
		return inscripcionRepository.findPresentedByPrueba(pruebaid);
	}

	@Override
	public Long findMaxDorsalByPrueba(Long idprueba) {
		return inscripcionRepository.findMaxDorsalByPrueba(idprueba);
	}

	@Override
	public Iterable<Inscripcion> findByCompeticion(Long competicionid) {
		return inscripcionRepository.findByCompeticion(competicionid);
	}

	@Override
	public Inscripcion findUnique(Long idprueba, String licencia) {
		return inscripcionRepository.findUnique(idprueba, licencia);
	}

}
