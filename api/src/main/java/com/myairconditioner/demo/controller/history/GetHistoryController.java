package com.myairconditioner.demo.controller.history;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myairconditioner.demo.repository.OperatingHistoryRepository;
import com.myairconditioner.demo.controller.ResponseHandler;
import com.myairconditioner.demo.model.OperatingHistoryEntity;

@CrossOrigin(origins = { "http://localhost:8080", "http://localhost:8081", "http://localhost:3000" })
@RestController
@RequestMapping("/api/history")
public class GetHistoryController {

    @Autowired
    OperatingHistoryRepository operatingHistoryRepository;

    @GetMapping(value = "/getHistory", params = { "day1", "month1", "year1", "day2", "month2", "year2" })
    public ResponseEntity<Object> getHistory(
            @RequestParam(name = "day1") Integer day1,
            @RequestParam(name = "month1") Integer month1,
            @RequestParam(name = "year1") Integer year1,
            @RequestParam(name = "day2") Integer day2,
            @RequestParam(name = "month2") Integer month2,
            @RequestParam(name = "year2") Integer year2) {

        try {

            if (day1 == null | month1 == null | year1 == null | day2 == null | month2 == null | year2 == null)
                throw new Exception("Parâmetros inválidos.");

            LocalDate firstDate = LocalDate.of(year1, month1, day1);
            LocalDate secondDate = LocalDate.of(year2, month2, day2);

            List<OperatingHistoryEntity> list = operatingHistoryRepository.findByDateBetween(firstDate, secondDate);

            return ResponseHandler.generateResponse(
                    "A busca foi um sucesso",
                    HttpStatus.OK,
                    list);

        } catch (Exception e) {

            return ResponseHandler.generateResponse(
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST,
                    new ArrayList<OperatingHistoryEntity>());

        }

    }
}
