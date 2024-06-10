package com.tesis.mcs.usuarios.controller;

import com.tesis.mcs.lib.response.BaseResponse;
import com.tesis.mcs.lib.utils.RespuestaComun;
import com.tesis.mcs.lib.utils.TesisNotFoundException;
import com.tesis.mcs.usuarios.jwt.JwtServiceImpl;
import com.tesis.mcs.usuarios.model.Usuariodetalle;
import com.tesis.mcs.usuarios.request.UsuarioDetalleRequest;
import com.tesis.mcs.usuarios.response.UsuarioDetalleResponse;
import com.tesis.mcs.usuarios.service.IUsuarioDetalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UsuarioController {

    @Autowired
    private IUsuarioDetalleService servicioUsuarioDetalle;

    @Autowired
    private JwtServiceImpl serviceJwt;

    @PostMapping("/crear")
    public ResponseEntity<RespuestaComun> crearUsuarioDetalle(@RequestBody UsuarioDetalleRequest usuario) throws Exception {

        Usuariodetalle usuariodetalle = usuario.mapearDato(usuario, Usuariodetalle.class);
        Usuariodetalle entity = null;
        try {
            entity = servicioUsuarioDetalle.insertarUsuarioDetalle(usuariodetalle);
        } catch (DataIntegrityViolationException e) {
            throw new TesisNotFoundException("Error al guardar datos: {0}", e.getMessage().split("Detail:")[1].split("]")[0]);
        }
        UsuarioDetalleResponse resp = new UsuarioDetalleResponse();
        resp.mapearDato(entity, UsuarioDetalleResponse.UsuarioDetalleDto.class,  "idrol");
        return new ResponseEntity<>(resp, serviceJwt.regeneraToken(), HttpStatus.OK);
    }

    @GetMapping("/detail/{username}")
    public ResponseEntity<?> getDetail(@PathVariable String username) throws Exception {
        var user = servicioUsuarioDetalle.userDetailsService().loadUserByUsername(username);
        Map<String, Object> obj = new HashMap<>();
        obj.put("username", user.getUsername());
        obj.put("password", user.getPassword());
        obj.put("rol", user.getAuthorities().stream().map(element -> element.getAuthority()).toList() );
        return new ResponseEntity<>(obj, new HttpHeaders(), HttpStatus.OK);
    }

}
