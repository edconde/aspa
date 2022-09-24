package com.uvigo.aspa.services;

import com.uvigo.aspa.models.AlturaPrueba;
import com.uvigo.aspa.models.AlturaPruebaPK;

public interface IAlturaPruebaService extends IBaseService<AlturaPrueba, AlturaPruebaPK> {

	Iterable<AlturaPrueba> findByIdprueba(Long pruebaid);
	Integer numAlturas(Long pruebaid);
	Integer getMaxIdaltura(Long pruebaid);
}
