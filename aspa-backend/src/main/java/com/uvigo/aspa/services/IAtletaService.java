package com.uvigo.aspa.services;

import com.uvigo.aspa.models.Atleta;

public interface IAtletaService extends IBaseService<Atleta, Long> {
	
	Atleta findByCredentials(String email, String password);
	Atleta findByEmail(String email);
	Atleta findByLicenciaOrDni(String licencia, String dni);
}
