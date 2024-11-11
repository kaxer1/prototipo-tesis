package com.tesis.mcs.asistente.sdk.helper;

import com.tesis.mcs.asistente.model.Archivosusuario;
import com.tesis.mcs.asistente.model.Asistente;
import com.tesis.mcs.asistente.request.AsistenteRequest;
import com.tesis.mcs.asistente.sdk.dto.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@AllArgsConstructor
public class AsistenteHelper {

    public AssistantCreateParamsDto crearAsistenteParam(AsistenteRequest asistenteRequest, String vector_store_id) {
        AssistantCreateParamsDto dto = new AssistantCreateParamsDto();
        dto.setInstructions(asistenteRequest.getInstructions());
        dto.setName(asistenteRequest.getName());
        dto.setModel(asistenteRequest.getModel());

        // Tool
        ToolDto tooldto = new ToolDto();
        tooldto.setType("file_search");
        List<ToolDto> tools = new ArrayList<>();
        tools.add(tooldto);
        dto.setTools(tools);

        // Vector
        List<String> vectorStoreIDS = new ArrayList<>();
        vectorStoreIDS.add(vector_store_id);
        FileSearchDto fileSearchDto = new FileSearchDto();
        fileSearchDto.setVectorStoreIDS(vectorStoreIDS);
        ToolResourcesDto resourcesDto = new ToolResourcesDto();
        resourcesDto.setFileSearch(fileSearchDto);
        dto.setToolResources(resourcesDto);

        return dto;
    }

    public AssistantUpdateParamsDto actualizarAsistenteParam(AsistenteRequest asistenteRequest, String vector_store_id) {
        AssistantUpdateParamsDto dto = new AssistantUpdateParamsDto();
        dto.setInstructions(asistenteRequest.getInstructions());
        dto.setName(asistenteRequest.getName());
        dto.setModel(asistenteRequest.getModel());

        // Tool
        ToolDto tooldto = new ToolDto();
        tooldto.setType("file_search");
        List<ToolDto> tools = new ArrayList<>();
        tools.add(tooldto);
        dto.setTools(tools);

        // Vector
        List<String> vectorStoreIDS = new ArrayList<>();
        vectorStoreIDS.add(vector_store_id);
        FileSearchDto fileSearchDto = new FileSearchDto();
        fileSearchDto.setVectorStoreIDS(vectorStoreIDS);
        ToolResourcesDto resourcesDto = new ToolResourcesDto();
        resourcesDto.setFileSearch(fileSearchDto);
        dto.setToolResources(resourcesDto);

        return dto;
    }

    public Archivosusuario crearArchivoSistema(FileVectorStorageDto archivoOpenAi, String name, Integer idusuario) {
        String[] filename = name.split("\\.");
        Archivosusuario archivo = new Archivosusuario();
        archivo.setIdusuario(idusuario);
        archivo.setNombrevector( Arrays.stream(filename).findFirst().get() + "-Storages");
        archivo.setIdvector(archivoOpenAi.getId());
        archivo.setVectorstoreid(archivoOpenAi.getVectorStoreID());
        return archivo;
    }

    public Asistente crearAsistenteSistema(AsistenteRequest asistenteRequest, AssistantCreateResponseDto responseDto) {
        Asistente asistente = asistenteRequest.mapearDato(asistenteRequest, Asistente.class, "id");
        asistente.setVectorstoreid(responseDto.getToolResources().getFileSearch().getVectorStoreIDS().get(0));
        asistente.setIdasistente(responseDto.getId());
        asistente.setDescription(responseDto.getDescription());
        asistente.setActivo(true);
        return asistente;
    }

    public Asistente actualizaAsistenteSistema(AsistenteRequest asistenteRequest) {
        Asistente asistente = asistenteRequest.mapearDato(asistenteRequest, Asistente.class);
        return asistente;
    }
}
