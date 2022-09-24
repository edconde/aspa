package com.uvigo.aspa.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@SuppressWarnings("serial")
@Embeddable
public class ClasificacionPK implements Serializable {
	
    @Column(name = "prueba_idprueba")
    private Long idprueba;
    @Column(name = "atleta_idatleta")
    private Long atleta;

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
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		ClasificacionPK that = (ClasificacionPK) o;

		if (!idprueba.equals(that.idprueba))
			return false;
		return atleta.equals(that.atleta);
	}

	@Override
	public int hashCode() {
		int result = idprueba.hashCode();
		result = 31 * result + atleta.hashCode();
		return result;
	}

}
