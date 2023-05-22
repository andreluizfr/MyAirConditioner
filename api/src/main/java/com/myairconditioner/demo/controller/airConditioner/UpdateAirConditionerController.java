package com.myairconditioner.demo.controller.airConditioner;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.MyAirConditionerApplication;
import com.myairconditioner.demo.controller.ResponseHandler;

@RestController
@RequestMapping("/api/airConditioner")
public class UpdateAirConditionerController {

    @PostMapping(value = "/updateAirConditioner", params = "isOn")
    public ResponseEntity<Object> updateAirConditioner(@RequestParam("isOn") Boolean isOn) {

        try {

            MyAirConditionerApplication.airConditionerIsOn = isOn;

            return ResponseHandler.generateResponse(
                    "Status do ar condicionado no servidor atualizado.",
                    HttpStatus.ACCEPTED,
                    "");

        } catch (Exception e) {

            return ResponseHandler.generateResponse(
                    e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "");

        }

    }
}
