package com.uvigo.aspa.repositories;

import com.uvigo.aspa.models.Competicion;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface CompeticionRepository extends CrudRepository<Competicion, Long> {

    @Query("SELECT c FROM Competicion c WHERE c.fecha BETWEEN :fechaInicio AND :fechaFin")
    Iterable<Competicion> findFiltradas(@Param("fechaInicio") Date fechaInicio, @Param("fechaFin") Date fechaFin);
    
    @Query("SELECT c FROM Competicion c WHERE c.fecha = :fecha")
    Iterable<Competicion> findByDate(@Param("fecha") Date fecha);

    @Query("SELECT c FROM Competicion c ORDER BY c.fecha DESC")
    List<Competicion> findPaginadas(Pageable pageable);
    
}
