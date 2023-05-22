package com.myairconditioner.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object responseObj) {
        Map<String, Object> jsonMap = new HashMap<String, Object>();
        jsonMap.put("message", message);
        jsonMap.put("data", responseObj);

        return new ResponseEntity<Object>(jsonMap, status);
    }
}
