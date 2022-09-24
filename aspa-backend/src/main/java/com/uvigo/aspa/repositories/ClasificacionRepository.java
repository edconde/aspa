package com.uvigo.aspa.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.uvigo.aspa.models.Clasificacion;
import com.uvigo.aspa.models.ClasificacionPK;

public interface ClasificacionRepository extends CrudRepository<Clasificacion, ClasificacionPK> {

	Iterable<Clasificacion> findByIdIdprueba(@Param("pruebaid") Long pruebaid);

	@Query("SELECT c FROM Clasificacion c, Prueba p WHERE c.id.idprueba = p.idprueba AND p.competicion.idcompeticion = :competicionid")
	Iterable<Clasificacion> findByCompetition(@Param("competicionid") Long competicionid);
}
