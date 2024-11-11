package com.tesis.mcs.asistente.sdk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileCountsDto {
    @JsonProperty("in_progress")
    private long inProgress;
    private long completed;
    private long failed;
    private long cancelled;
    private long total;
}
