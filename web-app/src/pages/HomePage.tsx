import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

import CurrentDateTime from "../queries/CurrentDateTime";
import TemperatureSensorStatus from "../queries/TemperatureSensorStatus";
import Temperature from "../queries/Temperature";
import AirConditionerControllerStatus from "../queries/AirConditionerControllerStatus";
import AirConditionerStatus from "../queries/AirConditionerStatus";
import AmbientSimulator from "../components/AmbientSimulator";



export default function HomePage ():JSX.Element {

    const CurrentDateTimeQuery = CurrentDateTime();

    const TemperatureSensorStatusQuery = TemperatureSensorStatus();
    const AirConditionerControllerStatusQuery = AirConditionerControllerStatus();

    const TemperatureQuery = Temperature(TemperatureSensorStatusQuery.data?.temperatureSensorStatus);
    const AirConditionerStatusQuery = AirConditionerStatus(AirConditionerControllerStatusQuery.data?.airConditionerControllerStatus);

    return (
        <div className="App">
    
            <header className="App-header">
    
                <span className='Logo'><Link to="/">MyAirConditioner</Link></span>
        
                <NavBar/>
    
            </header>
    
            <main className='App-main'>
    
                <section className='Home-status'>

                    {TemperatureSensorStatusQuery.data?.temperatureSensorStatus && AirConditionerControllerStatusQuery.data?.airConditionerControllerStatus &&
                        <div>
                            Current Date Time:{" "}
                            {CurrentDateTimeQuery.isLoading? 
                                <span>loading...</span>
                                :
                                CurrentDateTimeQuery.isError?
                                    <span>{CurrentDateTimeQuery.error.message}</span>
                                    :
                                    CurrentDateTimeQuery.data &&
                                        <span>{CurrentDateTimeQuery.data.dateTimeString}</span>
                                    
                            }
                        </div>
                    }

                    <div>
                        Temperature Sensor is Working:{" "}
                        {TemperatureSensorStatusQuery.isLoading? 
                            <span>loading...</span>
                            :
                            TemperatureSensorStatusQuery.isError?
                                <span>{TemperatureSensorStatusQuery.error?.message}</span>
                                :
                                TemperatureSensorStatusQuery.data &&
                                    <span>{JSON.stringify(TemperatureSensorStatusQuery.data.temperatureSensorStatus)}</span>
                                
                        }
                    </div>
                    
                    <div>
                        Air Conditioner Controller is Working:{" "}
                        {AirConditionerControllerStatusQuery.isLoading? 
                            <span>loading...</span>
                            :
                            AirConditionerControllerStatusQuery.isError?
                                <span>{AirConditionerControllerStatusQuery.error?.message}</span>
                                :
                                AirConditionerControllerStatusQuery.data &&
                                    <span>{JSON.stringify(AirConditionerControllerStatusQuery.data.airConditionerControllerStatus)}</span>
                                
                        }
                    </div>
                    
                    <AmbientSimulator 
                        currentDate={CurrentDateTimeQuery.data}
                        temperatureSensorStatus={TemperatureSensorStatusQuery.data?.temperatureSensorStatus}
                        temperature={TemperatureQuery.data?.temperature}
                        airConditionerControllerStatus={AirConditionerControllerStatusQuery.data?.airConditionerControllerStatus} 
                        airConditionerStatus={AirConditionerStatusQuery.data?.airConditionerStatus}
                    />

                </section>
            
            </main>
    
        </div>
    );
}