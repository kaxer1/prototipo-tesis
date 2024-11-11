package com.tesis.mcs.asistente.sdk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ToolResourcesDto {
    @JsonProperty("file_search")
    private FileSearchDto fileSearch;
}
