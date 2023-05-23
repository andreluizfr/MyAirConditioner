package com.myairconditioner.demo.controller.temperature;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.MyAirConditionerApplication;

@RestController
@RequestMapping("/api/temperature")
public class UpdateTemperatureSensor_Controller {

    @PostMapping(value = "/updateTemperatureSensor", params = "isWorking")
    public ResponseEntity<HttpStatus> update(@RequestParam("isWorking") Boolean isWorking) {

        try {

            MyAirConditionerApplication.temperatureSensorIsWorking = isWorking;

            return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);

        } catch (Exception e) {

            return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
}
