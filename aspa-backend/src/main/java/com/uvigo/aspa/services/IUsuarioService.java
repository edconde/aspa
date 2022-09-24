package com.uvigo.aspa.services;

import com.uvigo.aspa.models.Usuario;

public interface IUsuarioService extends IBaseService<Usuario, Long> {
	
	Usuario findByCredentials(String email, String password);
	Usuario findByEmailOrDni(String email, String dni);
	Usuario findByEmail(String email);
	Usuario findBySessionInfo(String email, String rol);
}
