package com.tesis.mcs.asistente.controller;

import com.tesis.mcs.asistente.model.Archivosusuario;
import com.tesis.mcs.asistente.model.Asistente;
import com.tesis.mcs.asistente.request.ArchivoUsuarioRequest;
import com.tesis.mcs.asistente.request.AsistenteRequest;
import com.tesis.mcs.asistente.service.IArchivoUsuarioService;
import com.tesis.mcs.asistente.service.IAsistenteService;
import com.tesis.mcs.lib.response.BaseResponse;
import com.tesis.mcs.lib.utils.RespuestaComun;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AsistenteController {

    @Autowired
    private IArchivoUsuarioService servicioArchivoUsuario;

    @Autowired
    private IAsistenteService servicioAsistente;


    private final DiscoveryClient discoveryClient;

    public AsistenteController(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @GetMapping("/services")
    public List<String> getServices() {
        return discoveryClient.getServices();
    }

    @PostMapping("/guardar-archivo")
    public ResponseEntity<RespuestaComun> guardarArchivo(HttpServletRequest request, @RequestBody ArchivoUsuarioRequest archivo) throws Exception {

        var entity = servicioArchivoUsuario.insertarArchivoUsuario(archivo.mapearDato(archivo, Archivosusuario.class, "id"));
        var resp = new BaseResponse();
        resp.setDto(entity);
        resp.setCodigo("OK");
        resp.setMensaje("Archivo guardado correctamente");
        return new ResponseEntity<>(resp, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/guardar-asistente")
    public ResponseEntity<RespuestaComun> guardarAsistente(HttpServletRequest request, @RequestBody AsistenteRequest asistente) throws Exception {

        var entity = servicioAsistente.insertarAsistente(asistente.mapearDato(asistente, Asistente.class, "id"));
        var resp = new BaseResponse();
        resp.setDto(entity);
        resp.setCodigo("OK");
        resp.setMensaje("Asistente guardado correctamente");
        return new ResponseEntity<>(resp, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/buscar-asistentes/{idusuario}")
    public ResponseEntity<RespuestaComun> buscarPorId(@PathVariable int idusuario) throws Exception {
        var entity = servicioAsistente.buscarPorIdUsuario(idusuario);
        BaseResponse resp = new BaseResponse();
        resp.setLista(entity);
        return new ResponseEntity<>(resp, new HttpHeaders(), HttpStatus.OK);
    }

}
