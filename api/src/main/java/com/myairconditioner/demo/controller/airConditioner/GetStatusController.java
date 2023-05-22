package com.myairconditioner.demo.controller.airConditioner;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.MyAirConditionerApplication;
import com.myairconditioner.demo.controller.ResponseHandler;

@RestController
@RequestMapping("/api/airConditioner")
public class GetStatusController {

    @GetMapping("/status")
    public ResponseEntity<Object> getStatus() {

        try {

            return ResponseHandler.generateResponse(
                    "Busca por estado do ar condicionado foi um sucesso.",
                    HttpStatus.ACCEPTED,
                    MyAirConditionerApplication.airConditionerIsOn);

        } catch (Exception e) {

            return ResponseHandler.generateResponse(
                    e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "");

        }

    }
}
