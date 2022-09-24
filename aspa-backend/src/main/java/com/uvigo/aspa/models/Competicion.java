package com.uvigo.aspa.models;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
public class Competicion {

	@Id
    @GeneratedValue(strategy= GenerationType.AUTO)
	private Long idcompeticion;
	private String nombre;
	private Date fecha;
	private String lugar;
	@OneToMany(mappedBy = "competicion")
    private Set<Prueba> pruebas = new HashSet<>();
	
	public Long getIdcompeticion() {
		return idcompeticion;
	}
	public void setIdcompeticion(Long idcompeticion) {
		this.idcompeticion = idcompeticion;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public String getLugar() {
		return lugar;
	}
	public void setLugar(String lugar) {
		this.lugar = lugar;
	}
	public Set<Prueba> getPruebas() {
		return pruebas;
	}
	public void setPruebas(Set<Prueba> pruebas) {
		this.pruebas = pruebas;
	}
	
}
