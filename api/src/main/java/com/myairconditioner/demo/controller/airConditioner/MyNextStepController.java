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
public class MyNextStepController {

    @GetMapping("/myNextStep")
    public ResponseEntity<Object> nextStep() {

        try {

            if (MyAirConditionerApplication.temperature > 26) {
                MyAirConditionerApplication.airConditionerIsOn = true;

                return ResponseHandler.generateResponse(
                        "O ar condicionado deve ficar ligado.",
                        HttpStatus.ACCEPTED,
                        true);
            } else {
                MyAirConditionerApplication.airConditionerIsOn = false;

                return ResponseHandler.generateResponse(
                        "O ar condicionado deve ficar desligado.",
                        HttpStatus.ACCEPTED,
                        false);
            }

        } catch (Exception e) {

            return ResponseHandler.generateResponse(
                    e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "");

        }

    }
}
