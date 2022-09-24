package com.uvigo.aspa.models;

import javax.persistence.*;

@Entity
@Table(name = "prueba_altura")
public class AlturaPrueba {
	
	@EmbeddedId
    private AlturaPruebaPK id;
	
	@Column
	private Double altura;

    public AlturaPruebaPK getId() {
		return id;
	}

	public void setId(AlturaPruebaPK id) {
		this.id = id;
	}
	
	public Double getAltura() {
		return altura;
	}

	public void setAltura(Double altura) {
		this.altura = altura;
	}

}