package com.uvigo.aspa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.uvigo.aspa.models.MarcaSv;
import com.uvigo.aspa.models.MarcaSvPK;

public interface MarcaSvRepository extends CrudRepository<MarcaSv, MarcaSvPK> {
	
    Iterable<MarcaSv> findByIdIdprueba(@Param("pruebaid") Long pruebaid);
}
