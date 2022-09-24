package com.uvigo.aspa.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

@SuppressWarnings("serial")
@Embeddable
public class MarcaSvPK implements Serializable {

    @JsonIgnore
    @Column(name="prueba_altura_prueba_idprueba")
	private Long idprueba;
    
    @Column(name = "prueba_altura_idaltura")
    private Long idaltura;

    @Column(name = "atleta_idatleta")
    private Long atleta;
    
    @Column
    private Long intento;

    public MarcaSvPK() {

    }

    public MarcaSvPK(Long idprueba, Long idaltura, Long idatleta, Long intento) {
        this.idprueba = idprueba;
        this.idaltura = idaltura;
        this.atleta = idatleta;
        this.intento = intento;
    }

    public Long getIdprueba() {
		return idprueba;
	}

	public void setIdprueba(Long idprueba) {
		this.idprueba = idprueba;
	}
	
	public Long getIdaltura() {
		return idaltura;
	}

	public void setIdaltura(Long idaltura) {
		this.idaltura = idaltura;
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

        MarcaSvPK that = (MarcaSvPK) o;

        if (!idprueba.equals(that.idprueba)) return false;
        if (!idaltura.equals(that.idaltura)) return false;
        if (!atleta.equals(that.atleta)) return false;
        return intento.equals(that.intento);
    }

    @Override
    public int hashCode() {
        int result = idprueba.hashCode();
        result = 31 * result + idaltura.hashCode();
        result = 31 * result + atleta.hashCode();
        result = 31 * result + intento.hashCode();
        return result;
    }
}
