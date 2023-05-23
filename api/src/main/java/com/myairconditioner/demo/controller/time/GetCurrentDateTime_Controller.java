package com.myairconditioner.demo.controller.time;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.MyAirConditionerApplication;

@CrossOrigin(origins = { "http://localhost:8080", "http://localhost:8081", "http://localhost:3000" })
@RestController
@RequestMapping("/api/time")
public class GetCurrentDateTime_Controller {

    @GetMapping("/current")
    public ResponseEntity<LocalDateTime> getCurrentDateTime() {

        try {

            return new ResponseEntity<LocalDateTime>(MyAirConditionerApplication.currentDate,
                    HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<LocalDateTime>(MyAirConditionerApplication.currentDate,
                    HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
}
