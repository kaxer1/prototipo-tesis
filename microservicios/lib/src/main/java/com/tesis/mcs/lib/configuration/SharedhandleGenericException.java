package com.tesis.mcs.lib.configuration;

import com.tesis.mcs.lib.response.RestErrorResponse;

import com.tesis.mcs.lib.utils.TesisNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class SharedhandleGenericException {

    @ExceptionHandler(TesisNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    RestErrorResponse handleCustomerNotFoundException(TesisNotFoundException ex) {
        return new RestErrorResponse( HttpStatus.NOT_FOUND.value(), ex.getMessage());
    }

    // Handle any other exception too.
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    RestErrorResponse handleException(Exception ex) {
        return new RestErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
    }

}
