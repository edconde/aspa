package com.uvigo.aspa.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "inscripcion")
public class Inscripcion {
	
	@Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long idinscripcion;
	
	@ManyToOne
    @JoinColumn(name="atleta_idatleta")
    private Atleta atleta;

    @JsonIgnore
    @Column(name="prueba_idprueba")
	private Long idprueba;
	
	private boolean presentado;

	private Long dorsal;
	
    public Long getIdinscripcion() {
		return idinscripcion;
	}
	public void setIdinscripcion(Long idinscripcion) {
		this.idinscripcion = idinscripcion;
	}
	
    public Atleta getAtleta() {
    	return this.atleta;
    }
    public void setAtleta(Atleta atleta) {
    	this.atleta = atleta;
    }

	public Long getIdprueba() {
    	return this.idprueba;
    }
	public void setIdprueba(Long idprueba) {
		this.idprueba = idprueba;
	}

	public boolean isPresentado() {
		return presentado;
	}
	public void setPresentado(boolean presentado) {
		this.presentado = presentado;
	}
	
	public Long getDorsal() {
		return dorsal;
	}
	public void setDorsal(Long dorsal) {
		this.dorsal = dorsal;
	}

}