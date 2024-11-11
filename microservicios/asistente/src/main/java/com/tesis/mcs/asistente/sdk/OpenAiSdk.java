package com.tesis.mcs.asistente.sdk;

import com.tesis.mcs.asistente.sdk.dto.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@FeignClient(name = "nest-service", path = "/openai")
public interface OpenAiSdk {

    @GetMapping(value = "/lista-models", consumes = "application/json;charset=UTF-8")
    List<ModelsDto> listaModels();

    @PostMapping(value = "/upload-file", consumes = "multipart/form-data")
    FileVectorStorageDto uploadFile(@RequestPart("file") MultipartFile file);

    @PostMapping(value = "/delete-file/{vectorstoreid}", consumes = "application/json;charset=UTF-8")
    DeleteFileResponseDto eliminarFile(@PathVariable() String vectorstoreid);

    @PostMapping(value = "/crear-asistente", consumes = "application/json;charset=UTF-8")
    AssistantCreateResponseDto crearAsistente(@RequestBody AssistantCreateParamsDto asistente);

    @PostMapping(value = "/actualizar-asistente/{assistantid}", consumes = "application/json;charset=UTF-8")
    AssistantCreateResponseDto actualizarAsistente(@PathVariable() String assistantid, @RequestBody AssistantUpdateParamsDto asistente);

    @PostMapping(value = "/eliminar-asistente/{assistantid}", consumes = "application/json;charset=UTF-8")
    AssistantDeletedResponseDto eliminarAsistente(@PathVariable() String assistantid);

}
