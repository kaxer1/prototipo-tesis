package com.tesis.mcs.lib.utils;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.text.MessageFormat;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class TesisNotFoundException extends RuntimeException {
    public TesisNotFoundException(String message, Object... parametros) {
        super(MessageFormat.format(message,parametros));
    }
}
