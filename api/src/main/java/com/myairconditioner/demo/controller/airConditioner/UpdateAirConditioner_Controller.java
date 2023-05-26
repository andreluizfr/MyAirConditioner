package com.myairconditioner.demo.controller.airConditioner;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.MyAirConditionerApplication;

@RestController
@RequestMapping("/api/airConditioner")
public class UpdateAirConditioner_Controller {

    @PostMapping(value = "/updateAirConditioner", params = "isOn")
    public ResponseEntity<HttpStatus> updateAirConditioner(@RequestParam("isOn") Boolean isOn) {

        try {

            MyAirConditionerApplication.airConditionerControllerIsWorking = true;
            MyAirConditionerApplication.airConditionerControllerTimeout = 0;
            MyAirConditionerApplication.airConditionerIsOn = isOn;

            return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);

        } catch (Exception e) {

            return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
}
