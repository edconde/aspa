package com.uvigo.aspa.services;

import com.uvigo.aspa.models.Prueba;

public interface IPruebaService extends IBaseService<Prueba, Long> {

	Iterable<Prueba> findByCompetition(Long competicionid);
	Prueba findByCompetitionAndType(Long idtipoprueba, Long competicionid);
	Integer countByCompetition(Long competicionid);
	Integer countByTipoPrueba(Long tipoPruebaid);
}
