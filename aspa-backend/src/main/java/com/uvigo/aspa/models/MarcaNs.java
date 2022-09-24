package com.uvigo.aspa.models;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "marca_prueba_ns")
public class MarcaNs {

	@EmbeddedId
    private MarcaNsPK id;
    
    @Column
    private String resultado;
    
    @Column
    private String marca;
    
    public MarcaNs() {
    	
    }

    public MarcaNsPK getId() {
		return id;
	}

	public void setId(MarcaNsPK id) {
		this.id = id;
	}

	public String getResultado() {
		return resultado;
	}

	public void setResultado(String resultado) {
		this.resultado = resultado;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}
	
}
