package com.uvigo.aspa.repositories;

import com.uvigo.aspa.models.Atleta;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface AtletaRepository extends CrudRepository<Atleta, Long> {
	
    @Query("SELECT a FROM Atleta a WHERE a.email = :email AND a.password = :password")
    Atleta findByCredentials(@Param("email") String licencia, @Param("password") String password);
    
    @Query("SELECT a FROM Atleta a WHERE a.email = :email")
    Atleta findByEmail(@Param("email") String email);
    
    @Query("SELECT a FROM Atleta a WHERE a.licencia = :licencia OR a.dni = :dni")
    Atleta findByLicenciaOrDni(@Param("licencia") String licencia, @Param("dni") String dni);

}
