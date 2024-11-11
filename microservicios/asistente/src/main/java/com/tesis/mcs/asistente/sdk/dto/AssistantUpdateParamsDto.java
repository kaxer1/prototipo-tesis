package com.tesis.mcs.asistente.sdk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AssistantUpdateParamsDto {
    private String name;
    private String instructions;
    private List<ToolDto> tools;
    @JsonProperty("tool_resources")
    private ToolResourcesDto toolResources;
    private String model;
}
