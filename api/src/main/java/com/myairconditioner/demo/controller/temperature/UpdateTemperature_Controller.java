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
public class UpdateTemperature_Controller {

    @PostMapping(value = "/updateTemperature", params = "temperature")
    public ResponseEntity<HttpStatus> update(@RequestParam("temperature") Double temperature) {

        try {

            MyAirConditionerApplication.temperatureSensorIsWorking = true;
            MyAirConditionerApplication.temperatureSensorTimeout = 0;
            MyAirConditionerApplication.temperature = temperature;

            return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);

        } catch (Exception e) {

            return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
}
