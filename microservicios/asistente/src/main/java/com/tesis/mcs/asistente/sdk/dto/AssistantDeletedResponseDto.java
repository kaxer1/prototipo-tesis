package com.tesis.mcs.asistente.sdk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssistantDeletedResponseDto {
    private String id;
    private String object;
    private boolean deleted;
}
