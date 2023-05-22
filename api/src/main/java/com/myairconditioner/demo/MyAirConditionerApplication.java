package com.myairconditioner.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyAirConditionerApplication {

	public static Double temperature = 0.0;
	public static Boolean airConditionerIsOn = true;

	public static void main(String[] args) {
		SpringApplication.run(MyAirConditionerApplication.class, args);
	}

}
