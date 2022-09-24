package com.uvigo.aspa.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.uvigo.aspa.models.Inscripcion;

public interface InscripcionRepository extends CrudRepository<Inscripcion, Long> {

    @Query("SELECT i FROM Inscripcion i WHERE i.idprueba = :pruebaid")
    Iterable<Inscripcion> findByPrueba(@Param("pruebaid") Long pruebaid);
    
    @Query("SELECT i FROM Inscripcion i WHERE i.idprueba = :pruebaid AND i.presentado = true")
    Iterable<Inscripcion> findPresentedByPrueba(@Param("pruebaid") Long pruebaid);
    
    @Query("SELECT max(dorsal) FROM Inscripcion i WHERE i.idprueba = :idprueba")
    Long findMaxDorsalByPrueba(@Param("idprueba") Long idprueba);
    
    @Query("SELECT i FROM Inscripcion i, Prueba p WHERE i.idprueba = p.idprueba AND p.competicion.idcompeticion = :competicionid")
    Iterable<Inscripcion> findByCompeticion(@Param("competicionid") Long competicionid);
    
    @Query("SELECT i FROM Inscripcion i WHERE i.idprueba = :idprueba AND i.atleta.licencia = :licencia")
    Inscripcion findUnique(@Param("idprueba") Long idprueba, @Param("licencia") String licencia);
}
