package com.uvigo.aspa.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.uvigo.aspa.models.Club;
import com.uvigo.aspa.repositories.ClubRepository;
import com.uvigo.aspa.services.IClubService;

public class ClubService implements IClubService {

	@Autowired
	ClubRepository clubRepository;
	
	@Override
	public Optional<Club> findById(Long resourceId) {
		return clubRepository.findById(resourceId);
	}

	@Override
	public Iterable<Club> findAll() {
		return clubRepository.findAll();
	}

	@Override
	public Club create(Club resource) {
		return clubRepository.save(resource);
	}

	@Override
	public Club update(Club resource) {
		return clubRepository.save(resource);
	}

	@Override
	public void delete(Club resource) {
		clubRepository.delete(resource);
	}

	@Override
	public void deleteById(Long resourceId) {
		clubRepository.deleteById(resourceId);
	}

	@Override
	public Club findByLicenciaOrNombre(String licencia, String nombre) {
		return clubRepository.findByLicenciaOrNombre(licencia, nombre);
	}

}
