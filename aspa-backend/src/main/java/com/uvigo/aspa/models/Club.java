package com.uvigo.aspa.models;

import javax.persistence.*;

@Entity
public class Club {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long idclub;
	private String licencia;
	private String nombre;
	private String direccion;
	private String email;
	private String telefono;

	public Long getIdclub() {
		return idclub;
	}

	public void setIdclub(Long idclub) {
		this.idclub = idclub;
	}

	public String getLicencia() {
		return licencia;
	}

	public void setLicencia(String licencia) {
		this.licencia = licencia;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

}
