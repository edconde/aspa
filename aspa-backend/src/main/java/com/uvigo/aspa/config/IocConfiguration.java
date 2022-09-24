package com.uvigo.aspa.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.uvigo.aspa.services.*;
import com.uvigo.aspa.services.impl.*;

@Configuration
@ComponentScan("com.uvigo.aspa.services")
public class IocConfiguration {
 
    @Bean
    public IAlturaPruebaService alturaPruebaService() {
        return new AlturaPruebaService();
    }
    @Bean
    public IAtletaService atletaService() {
        return new AtletaService();
    }
    @Bean
    public IClasificacionService clasificacionService() {
        return new ClasificacionService();
    }
    @Bean
    public IClubService clubService() {
        return new ClubService();
    }
    @Bean
    public ICompeticionService competicionService() {
        return new CompeticionService();
    }
    @Bean
    public IInscripcionService inscripcionService() {
        return new InscripcionService();
    }
    @Bean
    public IMarcaNsService marcaNsService() {
        return new MarcaNsService();
    }
    @Bean
    public IMarcaSvService marcaSvService() {
        return new MarcaSvService();
    }
    @Bean
    public IPruebaService pruebaService() {
        return new PruebaService();
    }
    @Bean
    public ITipoPruebaService tipoPruebaService() {
        return new TipoPruebaService();
    }
    @Bean
    public IUsuarioService usuarioService() {
        return new UsuarioService();
    }
    
}