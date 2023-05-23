import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

import CurrentDateTime from "../queries/CurrentDateTime";
import TemperatureSensorStatus from "../queries/TemperatureSensorStatus";
import Temperature from "../queries/Temperature";
import AirConditionerControllerStatus from "../queries/AirConditionerControllerStatus";
import AirConditionerStatus from "../queries/AirConditionerStatus";


export default function HomePage ():JSX.Element {

    const CurrentDateTimeQuery = CurrentDateTime();

    const TemperatureSensorStatusQuery = TemperatureSensorStatus();
    const TemperatureQuery = Temperature();

    const AirConditionerControllerStatusQuery = AirConditionerControllerStatus();
    const AirConditionerStatusQuery = AirConditionerStatus();

    useEffect(()=>{
        const refetchInterval = setInterval(()=>{
            CurrentDateTimeQuery.refetch();

            TemperatureSensorStatusQuery.refetch();
            TemperatureQuery.refetch();

            AirConditionerControllerStatusQuery.refetch();
            AirConditionerStatusQuery.refetch();
        }, 200) //0,2s
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    return (
        <div className="App">
    
            <header className="App-header">
    
                <span className='Logo'><Link to="/">MyAirConditioner</Link></span>
        
                <NavBar/>
    
            </header>
    
            <main className='App-main'>
    
                <section className='Home-message'>
                    <div>
                        Current Date Time: {CurrentDateTimeQuery.data?.dateTimeString}
                    </div>
                    <div>
                        Temperature Sensor is Working: {JSON.stringify(TemperatureSensorStatusQuery.data?.temperatureSensorStatus)}
                    </div>
                    <div>
                        Last Temperature registered: {TemperatureQuery.data?.temperature}°C
                    </div>
                    <div>
                        Air Conditioner Controller is Working: {JSON.stringify(AirConditionerControllerStatusQuery.data?.airConditionerControllerStatus)}
                    </div>
                    <div>
                        Last Air Conditioner is On: {JSON.stringify(AirConditionerStatusQuery.data?.airConditionerStatus)}
                    </div>
                </section>
            
            </main>
    
        </div>
    );
}