package com.uvigo.aspa.repositories;

import com.uvigo.aspa.models.TipoPrueba;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TipoPruebaRepository extends CrudRepository<TipoPrueba, Long> {
	
    @Query("SELECT t FROM TipoPrueba t WHERE "
    		+ "t.disciplina = :disciplina AND t.categoria = :categoria AND t.sexo = :sexo")
    TipoPrueba findEqual(@Param("disciplina") String disciplina,
    		@Param("categoria") String categoria,
    		@Param("sexo") String sexo);
}
