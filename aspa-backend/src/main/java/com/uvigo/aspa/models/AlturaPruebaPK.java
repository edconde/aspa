package com.uvigo.aspa.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

@SuppressWarnings("serial")
@Embeddable
public class AlturaPruebaPK implements Serializable {

	@JsonIgnore
	@Column(name = "prueba_idprueba")
	private Long idprueba;

	@Column
	private Long idaltura;

	public AlturaPruebaPK() {

	}

	public AlturaPruebaPK(Long idprueba, Long idaltura) {
		this.idprueba = idprueba;
		this.idaltura = idaltura;
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

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		AlturaPruebaPK that = (AlturaPruebaPK) o;

		if (!idprueba.equals(that.idprueba))
			return false;
		return idaltura.equals(that.idaltura);
	}

	@Override
	public int hashCode() {
		int result = idprueba.hashCode();
		result = 31 * result + idaltura.hashCode();
		return result;
	}
}
