package com.tesis.mcs.asistente.sdk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FileSearchDto {
    @JsonProperty("vector_store_ids")
    private List<String> vectorStoreIDS;
}
