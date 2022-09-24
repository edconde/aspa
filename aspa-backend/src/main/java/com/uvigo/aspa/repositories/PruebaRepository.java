package com.uvigo.aspa.repositories;

import com.uvigo.aspa.models.Prueba;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface PruebaRepository extends CrudRepository<Prueba, Long> {
    @Query("SELECT p FROM Prueba p WHERE p.competicion.idcompeticion = :competicionid")
    Iterable<Prueba> findByCompetition(@Param("competicionid") Long competicionid);
    
    // No se está usando:
    @Query("SELECT p FROM Prueba p WHERE p.competicion.idcompeticion = :competicionid AND p.tipo_prueba.idtipoprueba = :idtipoprueba")
    Prueba findByCompetitionAndType(@Param("idtipoprueba") Long idtipoprueba, @Param("competicionid") Long competicionid);

    @Query("SELECT COUNT (p) FROM Prueba p WHERE p.competicion.idcompeticion = :competicionid")
    Integer countByCompetition(@Param("competicionid") Long competicionid);
    
    @Query("SELECT COUNT (p) FROM Prueba p WHERE p.tipo_prueba.idtipoprueba = :tipoPruebaid")
    Integer countByTipoPrueba(@Param("tipoPruebaid") Long tipoPruebaid);
}
