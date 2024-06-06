package com.tesis.mcs.usuarios.controller;

import com.tesis.mcs.lib.utils.RespuestaComun;
import com.tesis.mcs.lib.utils.TesisNotFoundException;
import com.tesis.mcs.usuarios.jwt.JwtServiceImpl;
import com.tesis.mcs.usuarios.model.Usuariodetalle;
import com.tesis.mcs.usuarios.request.UsuarioDetalleRequest;
import com.tesis.mcs.usuarios.response.UsuarioDetalleResponse;
import com.tesis.mcs.usuarios.service.IUsuarioDetalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

}
