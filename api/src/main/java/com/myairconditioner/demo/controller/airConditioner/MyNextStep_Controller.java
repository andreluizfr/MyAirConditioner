package com.myairconditioner.demo.controller.airConditioner;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.MyAirConditionerApplication;

@RestController
@RequestMapping("/api/airConditioner")
public class MyNextStep_Controller {

    @GetMapping("/myNextStep")
    public ResponseEntity<Object> nextStep() {

        try {

            if (MyAirConditionerApplication.temperature > 26) {

                MyNextStepReponseData dataObject = new MyNextStepReponseData(true,
                        MyAirConditionerApplication.temperature, "O ar condicionado deve ficar ligado.");

                return new ResponseEntity<Object>(dataObject, HttpStatus.ACCEPTED);

            } else {

                MyNextStepReponseData dataObject = new MyNextStepReponseData(false,
                        MyAirConditionerApplication.temperature, "O ar condicionado deve ficar desligado.");

                return new ResponseEntity<Object>(dataObject, HttpStatus.ACCEPTED);

            }

        } catch (Exception e) {

            return new ResponseEntity<Object>("", HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
}
