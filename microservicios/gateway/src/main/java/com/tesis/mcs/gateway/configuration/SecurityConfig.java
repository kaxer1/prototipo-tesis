package com.tesis.mcs.gateway.configuration;

import com.tesis.mcs.gateway.jwt.JwtAuthenticationWebFilter;
import com.tesis.mcs.gateway.jwt.SecurityContextRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    private final SecurityContextRepository securityContextRepository;

    public SecurityConfig(SecurityContextRepository securityContextRepository) {
        this.securityContextRepository = securityContextRepository;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityWebFilterChain filterChain(ServerHttpSecurity http, JwtAuthenticationWebFilter jwtFilter) {
        return http.cors(cors -> cors.disable())
                .csrf(csrf -> csrf.disable())
                .authorizeExchange(exchangeSpec -> exchangeSpec.pathMatchers("/actuator/**","api/usuarios/autenticacion/**",
                                "/api/chatbot/chat-assistant/**").permitAll()
                        .anyExchange().authenticated())
//                .addFilterAt(jwtFilter, SecurityWebFiltersOrder.ANONYMOUS_AUTHENTICATION)
                .addFilterAt(jwtFilter, SecurityWebFiltersOrder.CORS)
                .securityContextRepository(securityContextRepository)
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .build();
    }

    @Bean
    WebSecurityCustomizer debugSecurity() {
        return (web) -> web.debug(true);
    }

}
