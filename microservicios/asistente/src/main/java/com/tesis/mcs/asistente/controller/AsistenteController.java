package com.tesis.mcs.asistente.controller;

import com.tesis.mcs.asistente.request.AsistenteRequest;
import com.tesis.mcs.asistente.sdk.OpenAiSdk;
import com.tesis.mcs.asistente.sdk.helper.AsistenteHelper;
import com.tesis.mcs.asistente.service.IArchivoUsuarioService;
import com.tesis.mcs.asistente.service.IAsistenteService;
import com.tesis.mcs.lib.response.BaseResponse;
import com.tesis.mcs.lib.utils.RespuestaComun;

import lombok.AllArgsConstructor;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@RestController
public class AsistenteController {

    private IArchivoUsuarioService servicioArchivoUsuario;
    private IAsistenteService servicioAsistente;
    private OpenAiSdk openAiSdk;
    private DiscoveryClient discoveryClient;
    private AsistenteHelper asistenteHelper;

    @GetMapping("/services")
    public List<String> getServices() {
        return discoveryClient.getServices();
    }

    @GetMapping("/lista-modelos")
    public ResponseEntity<?> buscarPorId() throws Exception {
        var lista = openAiSdk.listaModels();
        return new ResponseEntity<>(lista, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/buscar-asistentes/{idusuario}")
    public ResponseEntity<RespuestaComun> buscarPorId(@PathVariable int idusuario) throws Exception {
        var entity = servicioAsistente.buscarPorIdUsuario(idusuario);
        BaseResponse resp = new BaseResponse();
        resp.setLista(entity);
        return new ResponseEntity<>(resp, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/crear-asistente", consumes = "multipart/form-data")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<RespuestaComun> crearAsistente( @RequestPart("file") MultipartFile file, @RequestPart("dto") AsistenteRequest dto) throws Exception {
        // Sube archivo a openai
        var archivoOpenAi = openAiSdk.uploadFile(file);
        // Crea y guarda archivo subido en la base de dato
        var archivo = asistenteHelper.crearArchivoSistema(archivoOpenAi, file.getOriginalFilename(), dto.getIdusuario());
        servicioArchivoUsuario.insertarArchivoUsuario(archivo);
        // Crea Asistente Param y lo envia a open Ai
        var asistenteParam = asistenteHelper.crearAsistenteParam(dto, archivoOpenAi.getVectorStoreID());
        var asistenteOpenAi = openAiSdk.crearAsistente(asistenteParam);
        // Crea Asistente para guardar en el sistema
        var asistente = asistenteHelper.crearAsistenteSistema(dto, asistenteOpenAi);
        var entity = servicioAsistente.insertarAsistente(asistente);
        BaseResponse resp = new BaseResponse();
        resp.setDto(entity);
        return new ResponseEntity<>(resp, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/actualizar-asistente", consumes = "multipart/form-data")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<RespuestaComun> actualizarAsistente( @RequestPart(name = "file", required = false) MultipartFile file, @RequestPart("dto") AsistenteRequest dto) throws Exception {

        String vectorStoreId = dto.getVectorstoreid();
        if (file != null) {
            // Elimina y sube nuevo archivo
            openAiSdk.eliminarFile(dto.getVectorstoreid());
            var archivoOpenAi = openAiSdk.uploadFile(file);
            // Crea y guarda archivo subido en la base de dato
            var archivo = asistenteHelper.crearArchivoSistema(archivoOpenAi, file.getOriginalFilename(), dto.getIdusuario());
            servicioArchivoUsuario.insertarArchivoUsuario(archivo);
            vectorStoreId = archivoOpenAi.getVectorStoreID();
        }

        // Actualiza Asistente Param y lo envia a open Ai
        var asistenteParam = asistenteHelper.actualizarAsistenteParam(dto, vectorStoreId);
        openAiSdk.actualizarAsistente(dto.getIdasistente(), asistenteParam);
        // Actualiza Asistente para guardar en el sistema
        var asistente = asistenteHelper.actualizaAsistenteSistema(dto);
        asistente.setVectorstoreid(vectorStoreId);

        var entity = servicioAsistente.actualizarAsistente(asistente);
        BaseResponse resp = new BaseResponse();
        resp.setDto(entity);
        return new ResponseEntity<>(resp, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "/eliminar-asistente")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<RespuestaComun> eliminarAsistente( @RequestBody AsistenteRequest dto) throws Exception {
        // Elimina archivo openAi
        openAiSdk.eliminarFile(dto.getVectorstoreid());
        // Elimina asistente en openAi
        var asistenteOpenAi = openAiSdk.eliminarAsistente(dto.getIdasistente());
        // Eliminacion logica asistente en sistema
        var asistente = asistenteHelper.actualizaAsistenteSistema(dto);
        asistente.setActivo(false);
        var entity = servicioAsistente.actualizarAsistente(asistente);
        BaseResponse resp = new BaseResponse();
        resp.setDto(entity);
        return new ResponseEntity<>(resp, new HttpHeaders(), HttpStatus.OK);
    }

}
