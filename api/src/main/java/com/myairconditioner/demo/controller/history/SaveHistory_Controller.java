package com.myairconditioner.demo.controller.history;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.model.OperatingHistory_Entity;
import com.myairconditioner.demo.repository.OperatingHistory_Repository;

import com.myairconditioner.demo.MyAirConditionerApplication;

@RestController
@RequestMapping("/api/history")
public class SaveHistory_Controller {

    @Autowired
    OperatingHistory_Repository operatingHistoryRepository;

    @PostMapping("/saveHistory")
    public ResponseEntity<HttpStatus> saveHistory(@RequestBody SaveHistoryPropsData saveHistoryProps) {

        try {
            List<OperatingHistory_Entity> operatingHistoryList = operatingHistoryRepository
                    .findByDayAndMonthAndYear(saveHistoryProps.day, saveHistoryProps.month, saveHistoryProps.year);

            if (operatingHistoryList.isEmpty()) {

                OperatingHistory_Entity operatingHistoryCreated = new OperatingHistory_Entity(
                        saveHistoryProps.day,
                        saveHistoryProps.month,
                        saveHistoryProps.year,
                        saveHistoryProps.isOn,
                        saveHistoryProps.hour);

                operatingHistoryRepository.save(operatingHistoryCreated);

            } else {

                OperatingHistory_Entity operatingHistoryUpdated = operatingHistoryList.get(0);
                operatingHistoryUpdated.addHistory(saveHistoryProps.hour, saveHistoryProps.isOn);
                operatingHistoryRepository.save(operatingHistoryUpdated);

            }

            MyAirConditionerApplication.currentDate = LocalDateTime.of(
                    saveHistoryProps.year,
                    saveHistoryProps.month,
                    saveHistoryProps.day,
                    saveHistoryProps.hour,
                    0,
                    0);

            return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);

        } catch (Exception e) {

            return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
}
