package com.tesis.mcs.asistente.controller;

import com.tesis.mcs.lib.response.BaseResponse;
import com.tesis.mcs.lib.utils.RespuestaComun;
import com.tesis.mcs.lib.utils.TesisNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AsistenteController {

    private final DiscoveryClient discoveryClient;

    public AsistenteController(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @GetMapping("/services")
    public List<String> getServices() {
        return discoveryClient.getServices();
    }

    @PostMapping("/prueba")
    public ResponseEntity<RespuestaComun> prueba(HttpServletRequest request) throws Exception {

        if (true) {
            throw new TesisNotFoundException("La prueba da error {0} no existe");
        }
        return new ResponseEntity<>(new BaseResponse(), new HttpHeaders(), HttpStatus.OK);
    }

}
