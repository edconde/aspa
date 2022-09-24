package com.uvigo.aspa.services;

import com.uvigo.aspa.models.MarcaNs;
import com.uvigo.aspa.models.MarcaNsPK;

public interface IMarcaNsService extends IBaseService<MarcaNs, MarcaNsPK> {
	
	Iterable<MarcaNs> findByIdprueba(Long pruebaid);
}
