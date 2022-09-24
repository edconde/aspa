package com.uvigo.aspa.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.uvigo.aspa.models.AlturaPrueba;
import com.uvigo.aspa.models.AlturaPruebaPK;

public interface AlturaPruebaRepository extends CrudRepository<AlturaPrueba, AlturaPruebaPK> {

	Iterable<AlturaPrueba> findByIdIdprueba(@Param("pruebaid") Long pruebaid);
	
    @Query("SELECT COUNT(a.id.idaltura) FROM AlturaPrueba a WHERE a.id.idprueba = :idprueba")
    Integer numAlturas(@Param("idprueba") Long idprueba);
	
    @Query("SELECT MAX(a.id.idaltura) FROM AlturaPrueba a WHERE a.id.idprueba = :idprueba")
    Integer selectMaxIdaltura(@Param("idprueba") Long idprueba);
}
