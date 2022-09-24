package com.uvigo.aspa.models;

import java.sql.Date;

import javax.persistence.*;

import org.hibernate.annotations.ColumnTransformer;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Atleta {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idatleta;
	private String licencia;
	private String email;
	@JsonIgnore
	private String password;
	private String nombre;
	private String apellidos;
	@Column(name = "fecha_nacimiento")
	private Date fechaNacimiento;
	private boolean sexo;
	private String dni;
	private String telefono;
	@Column(name = "club_idclub")
	private String idclub;

	public Long getIdatleta() {
		return idatleta;
	}

	public void setIdatleta(Long idatleta) {
		this.idatleta = idatleta;
	}

	public String getLicencia() {
		return licencia;
	}

	public void setLicencia(String licencia) {
		this.licencia = licencia;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public boolean isSexo() {
		return sexo;
	}

	public void setSexo(boolean sexo) {
		this.sexo = sexo;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getIdclub() {
		return idclub;
	}

	public void setIdclub(String idclub) {
		this.idclub = idclub;
	}

}
