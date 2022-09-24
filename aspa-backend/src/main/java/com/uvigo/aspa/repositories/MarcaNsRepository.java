package com.uvigo.aspa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.uvigo.aspa.models.MarcaNs;
import com.uvigo.aspa.models.MarcaNsPK;

public interface MarcaNsRepository extends CrudRepository<MarcaNs, MarcaNsPK> {

    Iterable<MarcaNs> findByIdIdprueba(@Param("pruebaid") Long pruebaid);   
}
