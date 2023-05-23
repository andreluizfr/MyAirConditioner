package com.myairconditioner.demo;

import java.time.LocalDateTime;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyAirConditionerApplication {

	public static Boolean temperatureSensorIsWorking = false;
	public static Double temperature = -99999.9;

	public static Boolean airConditionerControllerIsWorking = false;
	public static Boolean airConditionerIsOn = false;

	public static LocalDateTime currentDate;

	public static Integer temperatureSensorTimeout = 0;
	public static Integer airConditionerControllerTimeout = 0;

	public static void main(String[] args) {
		SpringApplication.run(MyAirConditionerApplication.class, args);

		// conta até 5s para que os timeouts sejam resetados através das chamadas as
		// respectivas rotas
		// se os contadores chegarem em 5 (5s) muda os status do sensor e controlador
		// se após os 5 for detectado
		new Timer().scheduleAtFixedRate(new TimerTask() {
			@Override
			public void run() {
				temperatureSensorTimeout++;
				airConditionerControllerTimeout++;
				System.out.println("Waiting for Temperature Sensor to response..." + temperatureSensorTimeout);
				System.out.println(
						"Waiting for Air Conditioner Controller to response..." + airConditionerControllerTimeout);

				if (temperatureSensorTimeout >= 5) {
					temperatureSensorIsWorking = false;
				}
				if (airConditionerControllerTimeout >= 5) {
					airConditionerControllerIsWorking = false;
				}
			}
		}, 1000, 1000);

	}

}
