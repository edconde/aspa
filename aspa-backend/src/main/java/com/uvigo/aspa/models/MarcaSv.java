package com.uvigo.aspa.models;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "marca_prueba_sv")
public class MarcaSv {

	@EmbeddedId
    private MarcaSvPK id;
    
    @Column
    private String resultado;
    
    public MarcaSv() {
    	
    }

    public MarcaSvPK getId() {
		return id;
	}

	public void setId(MarcaSvPK id) {
		this.id = id;
	}

	public String getResultado() {
		return resultado;
	}

	public void setResultado(String resultado) {
		this.resultado = resultado;
	}

}
