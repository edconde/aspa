package com.uvigo.aspa.repositories;

import com.uvigo.aspa.models.Club;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface ClubRepository extends CrudRepository<Club, Long> {

    @Query("SELECT c FROM Club c WHERE c.licencia = :licencia OR c.nombre = :nombre")
    Club findByLicenciaOrNombre(@Param("licencia") String licencia, @Param("nombre") String nombre);
	
}
