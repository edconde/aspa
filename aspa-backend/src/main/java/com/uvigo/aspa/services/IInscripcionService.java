package com.uvigo.aspa.services;

import com.uvigo.aspa.models.Inscripcion;

public interface IInscripcionService extends IBaseService<Inscripcion, Long> {
	
	Iterable<Inscripcion> findByPrueba(Long pruebaid);
	Iterable<Inscripcion> findPresentedByPrueba(Long pruebaid);
	Long findMaxDorsalByPrueba(Long idprueba);
	Iterable<Inscripcion> findByCompeticion(Long competicionid);
	Inscripcion findUnique(Long idprueba, String licencia);
}
