package com.uvigo.aspa.models;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class Clasificacion {

    @EmbeddedId
    private ClasificacionPK id;
	private String posicion;
    
    public ClasificacionPK getId() {
		return id;
	}
	public void setId(ClasificacionPK id) {
		this.id = id;
	}

	public String getPosicion() {
		return posicion;
	}
	public void setPosicion(String posicion) {
		this.posicion = posicion;
	}
    
}
