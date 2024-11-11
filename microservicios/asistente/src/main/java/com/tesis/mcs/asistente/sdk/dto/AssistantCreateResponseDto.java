package com.tesis.mcs.asistente.sdk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AssistantCreateResponseDto {
    private String id;
    private String object;
    @JsonProperty("created_at")
    private long createdAt;
    private String name;
    private String description;
    private String model;
    private String instructions;
    private List<ToolDto> tools;
    @JsonProperty("tool_resources")
    private ToolResourcesDto toolResources;
    private MetadataDto metadata;
    @JsonProperty("top_p")
    private long topP;
    private long temperature;
    @JsonProperty("response_format")
    private String responseFormat;
}
