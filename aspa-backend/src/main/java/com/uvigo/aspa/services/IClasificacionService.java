package com.uvigo.aspa.services;

import com.uvigo.aspa.models.Clasificacion;
import com.uvigo.aspa.models.ClasificacionPK;

public interface IClasificacionService extends IBaseService<Clasificacion, ClasificacionPK> {

	Iterable<Clasificacion> findByIdprueba(Long pruebaid);
	Iterable<Clasificacion> findByCompetition(Long competicionid);
}
