package com.tesis.mcs.lib.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RestErrorResponse {
    int status;
    String message;
    String timestamp;
    public RestErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now().toString();
    }
}
