package com.myairconditioner.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myairconditioner.demo.model.OperatingHistoryEntity;

public interface OperatingHistoryRepository extends JpaRepository<OperatingHistoryEntity, Long> {

    List<OperatingHistoryEntity> findByDayAndMonthAndYear(Integer day, Integer month, Integer year);

    List<OperatingHistoryEntity> findByDateBetween(LocalDate to, LocalDate from);

}
