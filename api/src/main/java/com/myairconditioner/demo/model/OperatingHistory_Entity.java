package com.myairconditioner.demo.model;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity(name = "operatingHistory")
@Table(name = "operatingHistory")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class OperatingHistory_Entity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "day")
    private Integer day;

    @Column(name = "month")
    private Integer month;

    @Column(name = "year")
    private Integer year;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "history")
    private Boolean[] history;

    public OperatingHistory_Entity(Integer day, Integer month, Integer year, boolean isOn, Integer hour) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.date = LocalDate.of(year, month, day);

        this.history = new Boolean[24];
        Arrays.fill(history, true);
        this.history[hour] = isOn;
    }

    public void addHistory(Integer hour, boolean isOn) {
        this.history[hour] = isOn;
    }

}
