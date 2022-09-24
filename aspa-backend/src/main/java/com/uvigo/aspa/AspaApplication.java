package com.uvigo.aspa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
public class AspaApplication {

	public static void main(String[] args) {
		SpringApplication.run(AspaApplication.class, args);
	}

}
