package com.uvigo.aspa.models;

import javax.persistence.*;

@Entity
@Table(name="tipo_prueba")
public class TipoPrueba {
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private Long idtipoprueba;
	private String disciplina;
	private String categoria;
	private String sexo;
	
	public Long getIdtipoprueba() {
		return idtipoprueba;
	}
	public void setItipodprueba(Long idtipoprueba) {
		this.idtipoprueba = idtipoprueba;
	}
	public String getDisciplina() {
		return disciplina;
	}
	public void setDisciplina(String disciplina) {
		this.disciplina = disciplina;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
}
