package com.uvigo.aspa.services;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Pageable;

import com.uvigo.aspa.models.Competicion;

public interface ICompeticionService extends IBaseService<Competicion, Long>{

	public Iterable<Competicion> findFiltradas(Date fechaInicio, Date fechaFin);
	public Iterable<Competicion> findByDate(Date fecha);
	public List<Competicion> findPaginadas(Pageable pageable);
}
