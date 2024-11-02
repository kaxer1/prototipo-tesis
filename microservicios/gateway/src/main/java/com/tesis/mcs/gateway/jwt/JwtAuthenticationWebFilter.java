package com.tesis.mcs.gateway.jwt;


import org.springframework.http.*;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationWebFilter implements WebFilter{

    public JwtAuthenticationWebFilter() {}

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getPath().value();
        if (path.contains("actuator")) {
            return chain.filter(exchange);
        }
        if(path.contains("login") || path.contains("registrarse") || path.contains("recuperarcontrasenia"))
            return chain.filter(exchange);

        if(path.contains("/api/chatbot/chat-assistant"))
            return chain.filter(exchange);

        String auth = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if(auth == null)
            return Mono.error(new Throwable("no token was found"));
        if(!auth.startsWith("Bearer "))
            return Mono.error(new Throwable("invalid auth"));
        String token = auth.replace("Bearer ", "");
        exchange.getAttributes().put("token", token);
        return chain.filter(exchange);
//        String path = exchange.getRequest().getPath().value();
//        if (path.contains("actuator")) {
//            return chain.filter(exchange);
//        }
//
//        final String authHeader = (path.contains("login")) ? "" : exchange.getRequest().getHeaders().getFirst("Authorization");
//        final String token;
//
//        if (StringUtils.isEmpty(authHeader) || !authHeader.startsWith("Bearer ") ) {
//            return chain.filter(exchange);
//        }
//        token = authHeader.substring(7);
//        if (token != null && tokenProvider.validateToken(token)) {
//            var data = tokenProvider.extraerTokenData(token);
//            String url = "http://localhost:8002/detail/"+ data.get("username");  // Reemplaza con la URL de tu microservicio
//            HttpHeaders headers = new HttpHeaders();
//            headers.set("Authorization", "Bearer "+token);
//
//            HttpEntity<String> entity = new HttpEntity<>(headers);
//
//            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
//            var map = response.getBody();
//            var password = (String) map.get("password");
//            var rol = (ArrayList) response.getBody().get("rol");
//            var username = (String) response.getBody().get("username");
//            var list = List.of(new SimpleGrantedAuthority(rol.get(0).toString()));
//
//            UserDetails userDetails = new User(username, password, false, false, false, false, list);
//            Authentication auth = tokenProvider.getAuthentication(token, userDetails);
//
//
//        }
//
//        return chain.filter(exchange);
    }

}
