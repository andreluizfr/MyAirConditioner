package com.myairconditioner.demo.controller.temperature;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.MyAirConditionerApplication;
import com.myairconditioner.demo.controller.ResponseHandler;

@RestController
@RequestMapping("/api/temperature")
public class UpdateTemperatureController {

    @PostMapping(value = "/updateTemperature", params = "temperature")
    public ResponseEntity<Object> update(@RequestParam("temperature") Double t) {

        try {

            MyAirConditionerApplication.temperature = t;

            return ResponseHandler.generateResponse(
                    "Temperatura no servidor atualizada com sucesso",
                    HttpStatus.ACCEPTED,
                    t);

        } catch (Exception e) {

            return ResponseHandler.generateResponse(
                    e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "");

        }

    }
}
