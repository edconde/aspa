package com.uvigo.aspa.services;

import com.uvigo.aspa.models.TipoPrueba;

public interface ITipoPruebaService extends IBaseService<TipoPrueba, Long> {
	TipoPrueba findEqual(String disciplina, String categoria, String sexo);
}
