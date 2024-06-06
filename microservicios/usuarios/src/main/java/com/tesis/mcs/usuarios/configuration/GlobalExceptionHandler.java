package com.tesis.mcs.usuarios.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;


/**
 * Configuración de Manejador Global de Excepciones.
 * Esta clase de configuración define cómo se manejarán las excepciones en la aplicación.
 * Utiliza la anotación `@Configuration` para indicar que es una configuración de Spring.
 * También utiliza `@ComponentScan` para escanear y descubrir componentes en el paquete
 * 'com.tesis.mcs.lib.configuration' que pueden ser manejadores de excepciones.
 */

@Configuration
@ComponentScan(basePackages = "com.tesis.mcs.lib.configuration")
public class GlobalExceptionHandler {

}
