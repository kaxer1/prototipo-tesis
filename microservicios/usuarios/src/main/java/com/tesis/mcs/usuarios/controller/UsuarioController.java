package com.tesis.mcs.usuarios.controller;

import com.tesis.mcs.lib.utils.RespuestaComun;
import com.tesis.mcs.usuarios.request.UsuarioDetalleRequest;
import com.tesis.mcs.usuarios.response.UsuarioDetalleResponse;
import com.tesis.mcs.usuarios.service.IUsuarioDetalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UsuarioController {

    @Autowired
    private IUsuarioDetalleService servicioUsuarioDetalle;

    @GetMapping("/detail/{username}")
    public ResponseEntity<?> getDetail(@PathVariable String username) throws Exception {
        var user = servicioUsuarioDetalle.userDetailsService().loadUserByUsername(username);
        Map<String, Object> obj = new HashMap<>();
        obj.put("username", user.getUsername());
        obj.put("password", user.getPassword());
        obj.put("rol", user.getAuthorities().stream().map(element -> element.getAuthority()).toList() );
        return new ResponseEntity<>(obj, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/buscarporid/{idusuario}")
    public ResponseEntity<RespuestaComun> getInformacionUsuario(@PathVariable int idusuario) throws Exception {
        var user = servicioUsuarioDetalle.buscarPorId(idusuario);
        UsuarioDetalleResponse resp = new UsuarioDetalleResponse();
        resp.mapearDato(user, UsuarioDetalleResponse.UsuarioDetalleDto.class, "idrol","password");
        return new ResponseEntity<>(resp, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/actualizar-perfil")
    public ResponseEntity<RespuestaComun> postActualizarPerfil(@PathVariable UsuarioDetalleRequest registro) throws Exception {
        var user = servicioUsuarioDetalle.buscarPorId(registro.getIdusuario());
        UsuarioDetalleResponse resp = new UsuarioDetalleResponse();
        resp.mapearDato(user, UsuarioDetalleResponse.UsuarioDetalleDto.class, "idrol");
        return new ResponseEntity<>(resp, new HttpHeaders(), HttpStatus.OK);
    }

}
