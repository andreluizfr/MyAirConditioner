package com.myairconditioner.demo.controller.airConditioner;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MyNextStepReponseData {
    private boolean isOn;
    private Double temperature;
}
