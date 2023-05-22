package com.myairconditioner.demo.controller.temperature;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.MyAirConditionerApplication;
import com.myairconditioner.demo.controller.ResponseHandler;

@RestController
@RequestMapping("/api/temperature")
public class GetCurrentTemperatureController {

    @GetMapping()
    public ResponseEntity<Object> getCurrentTemperature() {

        try {

            return ResponseHandler.generateResponse(
                    "Temperatura buscada no servidor com sucesso.",
                    HttpStatus.ACCEPTED,
                    MyAirConditionerApplication.temperature);

        } catch (Exception e) {

            return ResponseHandler.generateResponse(
                    e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "");

        }

    }
}
