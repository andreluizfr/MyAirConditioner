package com.myairconditioner.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myairconditioner.demo.model.OperatingHistory_Entity;

public interface OperatingHistory_Repository extends JpaRepository<OperatingHistory_Entity, Long> {

    List<OperatingHistory_Entity> findByDayAndMonthAndYear(Integer day, Integer month, Integer year);

    List<OperatingHistory_Entity> findByDateBetween(LocalDate to, LocalDate from);

}
