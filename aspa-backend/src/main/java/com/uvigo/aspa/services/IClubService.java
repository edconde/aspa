package com.uvigo.aspa.services;

import com.uvigo.aspa.models.Club;

public interface IClubService extends IBaseService<Club, Long> {

	Club findByLicenciaOrNombre(String licencia, String nombre);
}
