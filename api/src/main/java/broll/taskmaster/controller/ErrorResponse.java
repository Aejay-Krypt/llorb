package broll.taskmaster.controller;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException.*;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ErrorResponse {

    @ExceptionHandler(Exception.class)
    private final ResponseEntity<ErrorStructure> handleAllExceptions(Exception ex, WebRequest request) {
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        String exMessage = "Unexpected error. Contact support.";

        if (ex instanceof NotFound) {
            httpStatus = HttpStatus.NOT_FOUND;
            exMessage = "Requested Model not found.";
        } else if (ex instanceof BadRequest) {
            httpStatus = HttpStatus.BAD_REQUEST;
            exMessage = "Bad request. Please check the request body.";
        }

        ErrorStructure response = new ErrorStructure();
        response.setCode(httpStatus.value());
        response.setError(ex.getMessage());
        response.setMessage(exMessage);

        return new ResponseEntity<>(response, httpStatus);
    }

    @Setter
    @Getter
    static class ErrorStructure {
        private int code;
        private String error;
        private String message;
    }
}

