package com.uvigo.aspa.repositories;

import com.uvigo.aspa.models.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface UsuarioRepository extends CrudRepository<Usuario, Long> {

    @Query("SELECT u FROM Usuario u WHERE u.email = :email AND u.password = :password")
    Usuario findByCredentials(@Param("email") String email, @Param("password") String password);
    
    @Query("SELECT u FROM Usuario u WHERE u.email = :email OR u.dni = :dni")
    Usuario findByEmailOrDni(@Param("email") String email, @Param("dni") String dni);
    
    @Query("SELECT u FROM Usuario u WHERE u.email = :email")
    Usuario findByEmail(@Param("email") String email);
    
    @Query("SELECT u FROM Usuario u WHERE u.email = :email AND u.rol = :rol")
    Usuario findBySessionInfo(@Param("email") String email, @Param("rol") String rol);
}
