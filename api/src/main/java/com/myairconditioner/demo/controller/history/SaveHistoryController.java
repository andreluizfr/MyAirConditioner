package com.myairconditioner.demo.controller.history;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.controller.ResponseHandler;
import com.myairconditioner.demo.model.OperatingHistoryEntity;
import com.myairconditioner.demo.repository.OperatingHistoryRepository;

@RestController
@RequestMapping("/api/history")
public class SaveHistoryController {

    @Autowired
    OperatingHistoryRepository operatingHistoryRepository;

    @PostMapping("/saveHistory")
    public ResponseEntity<Object> saveHistory(@RequestBody SaveHistoryProps saveHistoryProps) {

        try {
            List<OperatingHistoryEntity> operatingHistoryList = operatingHistoryRepository
                    .findByDayAndMonthAndYear(saveHistoryProps.day, saveHistoryProps.month, saveHistoryProps.year);

            System.out.println(saveHistoryProps.day.toString() + "/" + saveHistoryProps.month.toString()
                    + "/" + saveHistoryProps.year.toString() + " - " + saveHistoryProps.hour.toString() + "hrs");

            if (operatingHistoryList.isEmpty()) {

                OperatingHistoryEntity operatingHistoryCreated = new OperatingHistoryEntity(
                        saveHistoryProps.day,
                        saveHistoryProps.month,
                        saveHistoryProps.year,
                        saveHistoryProps.isOn,
                        saveHistoryProps.hour);

                operatingHistoryRepository.save(operatingHistoryCreated);

            } else {

                OperatingHistoryEntity operatingHistoryUpdated = operatingHistoryList.get(0);
                operatingHistoryUpdated.addHistory(saveHistoryProps.hour, saveHistoryProps.isOn);
                operatingHistoryRepository.save(operatingHistoryUpdated);

            }

            return ResponseHandler.generateResponse(
                    "Registro salvo com sucesso.",
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
