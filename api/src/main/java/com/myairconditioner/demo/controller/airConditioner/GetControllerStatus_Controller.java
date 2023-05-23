package com.myairconditioner.demo.controller.airConditioner;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.MyAirConditionerApplication;

@CrossOrigin(origins = { "http://localhost:8080", "http://localhost:8081", "http://localhost:3000" })
@RestController
@RequestMapping("/api/airConditioner")
public class GetControllerStatus_Controller {

    @GetMapping("/controllerStatus")
    public ResponseEntity<Boolean> getControllerStatus() {

        try {

            return new ResponseEntity<Boolean>(MyAirConditionerApplication.airConditionerControllerIsWorking,
                    HttpStatus.ACCEPTED);

        } catch (Exception e) {

            return new ResponseEntity<Boolean>(MyAirConditionerApplication.airConditionerControllerIsWorking,
                    HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
}
