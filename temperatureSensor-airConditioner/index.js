import 'dotenv/config';
import temperatureSensor from './_TemperatureSensor.js';
import airConditionerController from './_AirConditionerController.js';

const delayTime = Number(process.env.DELAY_TIME_IN_MS);
 //starting temperature in 0°C
temperatureSensor.init(0.0, delayTime);

//the simulating starting date from 01/05/2023 at 0 oclock
airConditionerController.init([2023, 5, 1, 0], delayTime); 
