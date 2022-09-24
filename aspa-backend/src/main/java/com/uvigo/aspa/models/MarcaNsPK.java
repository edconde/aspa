package com.uvigo.aspa.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

@SuppressWarnings("serial")
@Embeddable
public class MarcaNsPK implements Serializable {

    @JsonIgnore
    @Column(name="prueba_idprueba")
	private Long idprueba;

    @Column(name = "atleta_idatleta")
    private Long atleta;
    
    @Column
    private Long intento;

    public MarcaNsPK() {

    }

    public MarcaNsPK(Long idprueba, Long idatleta, Long intento) {
        this.idprueba = idprueba;
        this.atleta = idatleta;
        this.intento = intento;
    }

    public Long getIdprueba() {
		return idprueba;
	}

	public void setIdprueba(Long idprueba) {
		this.idprueba = idprueba;
	}

	public Long getAtleta() {
		return atleta;
	}

	public void setAtleta(Long atleta) {
		this.atleta = atleta;
	}

	public Long getIntento() {
		return intento;
	}

	public void setIntento(Long intento) {
		this.intento = intento;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MarcaNsPK that = (MarcaNsPK) o;

        if (!idprueba.equals(that.idprueba)) return false;
        if (!atleta.equals(that.atleta)) return false;
        return intento.equals(that.intento);
    }

    @Override
    public int hashCode() {
        int result = idprueba.hashCode();
        result = 31 * result + atleta.hashCode();
        result = 31 * result + intento.hashCode();
        return result;
    }
}
