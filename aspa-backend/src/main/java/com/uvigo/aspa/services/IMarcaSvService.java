package com.uvigo.aspa.services;

import com.uvigo.aspa.models.MarcaSv;
import com.uvigo.aspa.models.MarcaSvPK;

public interface IMarcaSvService extends IBaseService<MarcaSv, MarcaSvPK> {

	Iterable<MarcaSv> findByIdprueba(Long pruebaid);
}
