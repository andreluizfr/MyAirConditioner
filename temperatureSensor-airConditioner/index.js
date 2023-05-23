import 'dotenv/config';
import temperatureSensor from './_TemperatureSensor.js';
import airConditionerController from './_AirConditionerController.js';

 //starting temperature in 0°C
temperatureSensor.init(0.0);
//the simulating starting date from 01/05/2023 at 0 oclock, ending date is until 23/05/2023 at 23oclock
airConditionerController.init([2023, 5, 1, 0], [2023, 6, 30, 23]); 
