package com.tesis.mcs.asistente.sdk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileVectorStorageDto {
    private String id;
    private String object;
    @JsonProperty("created_at")
    private long createdAt;
    private String status;
    @JsonProperty("vector_store_id")
    private String vectorStoreID;
    @JsonProperty("file_counts")
    private FileCountsDto fileCounts;
}
