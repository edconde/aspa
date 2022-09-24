package com.uvigo.aspa.services.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import com.uvigo.aspa.models.Competicion;
import com.uvigo.aspa.repositories.CompeticionRepository;
import com.uvigo.aspa.services.ICompeticionService;

public class CompeticionService implements ICompeticionService {
	@Autowired
	CompeticionRepository competicionRepository;

	@Override
	public Optional<Competicion> findById(Long resourceId) {
		return competicionRepository.findById(resourceId);
	}

	@Override
	public Iterable<Competicion> findAll() {
		return competicionRepository.findAll();
	}

	@Override
	public Competicion create(Competicion resource) {
		return competicionRepository.save(resource);
	}

	@Override
	public Competicion update(Competicion resource) {
		return competicionRepository.save(resource);
	}

	@Override
	public void delete(Competicion resource) {
		competicionRepository.delete(resource);
	}

	@Override
	public void deleteById(Long resourceId) {
		competicionRepository.deleteById(resourceId);
	}

	@Override
	public Iterable<Competicion> findFiltradas(Date fechaInicio, Date fechaFin) {
		return competicionRepository.findFiltradas(fechaInicio, fechaFin);
	}

	@Override
	public Iterable<Competicion> findByDate(Date fecha) {
		return competicionRepository.findByDate(fecha);
	}

	@Override
	public List<Competicion> findPaginadas(Pageable pageable) {
		return competicionRepository.findPaginadas(pageable);
	}

}
