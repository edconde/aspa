package com.uvigo.aspa.models;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Prueba {

	@Id
    @GeneratedValue(strategy= GenerationType.AUTO)
	private Long idprueba;
	private Date fecha;
	private Timestamp hora_prueba;
	private Timestamp apertura_camara;
	private Timestamp cierre_camara;
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="competicion_idcompeticion")
	private Competicion competicion;
	@ManyToOne
	@JoinColumn(name="tipo_prueba_idtipoprueba")
	private TipoPrueba tipo_prueba;
	@ManyToOne
	@JsonIgnoreProperties({ "email", "password", "dni", "telefono"})
	@JoinColumn(name="usuario_idusuario")
	private Usuario usuario;
	private Long num_intentos;
	private Long num_intentos_mejora;
	private Long num_atletas_mejora;
	private boolean finalizada;
	
	public Long getIdprueba() {
		return idprueba;
	}
	public void setIdprueba(Long idprueba) {
		this.idprueba = idprueba;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public Timestamp getHora_prueba() {
		return hora_prueba;
	}
	public void setHora_prueba(Timestamp hora_prueba) {
		this.hora_prueba = hora_prueba;
	}
	public Timestamp getApertura_camara() {
		return apertura_camara;
	}
	public void setApertura_camara(Timestamp apertura_camara) {
		this.apertura_camara = apertura_camara;
	}
	public Timestamp getCierre_camara() {
		return cierre_camara;
	}
	public void setCierre_camara(Timestamp cierre_camara) {
		this.cierre_camara = cierre_camara;
	}
	public Competicion getCompeticion() {
		return competicion;
	}
	public void setCompeticion(Competicion competicion) {
		this.competicion = competicion;
	}
	public TipoPrueba getTipo_prueba() {
		return tipo_prueba;
	}
	public void setTipo_prueba(TipoPrueba tipo_prueba) {
		this.tipo_prueba = tipo_prueba;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public Long getNum_intentos() {
		return num_intentos;
	}
	public void setNum_intentos(Long num_intentos) {
		this.num_intentos = num_intentos;
	}
	public Long getNum_intentos_mejora() {
		return num_intentos_mejora;
	}
	public void setNum_intentos_mejora(Long num_intentos_mejora) {
		this.num_intentos_mejora = num_intentos_mejora;
	}
	public Long getNum_atletas_mejora() {
		return num_atletas_mejora;
	}
	public void setNum_atletas_mejora(Long num_atletas_mejora) {
		this.num_atletas_mejora = num_atletas_mejora;
	}
	public boolean isFinalizada() {
		return finalizada;
	}
	public void setFinalizada(boolean finalizada) {
		this.finalizada = finalizada;
	}
}
