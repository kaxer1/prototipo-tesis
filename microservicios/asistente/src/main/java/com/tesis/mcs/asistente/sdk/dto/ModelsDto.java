package com.tesis.mcs.asistente.sdk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModelsDto {
    private String id;
    private String object;
    private long created;
    @JsonProperty("owned_by")
    private String ownedBy;
}
