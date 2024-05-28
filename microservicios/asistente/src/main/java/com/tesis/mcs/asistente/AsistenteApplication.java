package com.tesis.mcs.asistente;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class AsistenteApplication {

	public static void main(String[] args) {
		SpringApplication.run(AsistenteApplication.class, args);
	}

}
