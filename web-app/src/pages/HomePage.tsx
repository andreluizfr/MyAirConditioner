import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

import CurrentDateTime from "../queries/CurrentDateTime";
import TemperatureSensorStatus from "../queries/TemperatureSensorStatus";
import Temperature from "../queries/Temperature";
import AirConditionerControllerStatus from "../queries/AirConditionerControllerStatus";
import AirConditionerStatus from "../queries/AirConditionerStatus";

import airConditioner from "../assets/air-conditioner.png";
import {ReactComponent as WavesIcon} from "../assets/waves-thin.svg";
import {ReactComponent as WindowIcon} from "../assets/window.svg";
import person from "../assets/person.png";
import temperatureHeat from "../assets/temperature-heat.png"
import temperatureCold from "../assets/temperature-cold.png"


export default function HomePage ():JSX.Element {

    const CurrentDateTimeQuery = CurrentDateTime();

    const TemperatureSensorStatusQuery = TemperatureSensorStatus();
    const TemperatureQuery = Temperature();

    const AirConditionerControllerStatusQuery = AirConditionerControllerStatus();
    const AirConditionerStatusQuery = AirConditionerStatus();

    useEffect(()=>{
        setInterval(()=>{
            CurrentDateTimeQuery.refetch();

            TemperatureSensorStatusQuery.refetch();
            TemperatureQuery.refetch();

            AirConditionerControllerStatusQuery.refetch();
            AirConditionerStatusQuery.refetch();
        }, 200) //0,2s
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    useEffect(()=>{

        if(CurrentDateTimeQuery.data){
            console.log(CurrentDateTimeQuery.data.dateTimeString);
            const hours = Number(CurrentDateTimeQuery.data.dateTimeString.split(" ")[1].split(":")[0]);
            console.log(hours);

            let windowBackgroundColor;

            if(hours >= 0  && hours <= 5)
                windowBackgroundColor = "rgb(50,50,50)";
            else if(hours >= 6 &&  hours <= 12){
                windowBackgroundColor = `rgb(${100+(hours*10)},${100+(hours*10)},${100+(hours*10)})`;
            }
            else if(hours >= 13 &&  hours <= 17){
                windowBackgroundColor = `rgb(${230-((hours-12)*10)},${230-((hours-12)*10)},${230-((hours-12)*10)})`;
            }
            else if(hours >= 18 && hours <=23)
                windowBackgroundColor = "rgb(50,50,50)";
            
            const el = document.getElementById("window") as HTMLElement;
            el.style.cssText = "background-color: "+windowBackgroundColor+";";
        }
        
    }, [CurrentDateTimeQuery.data]);

    return (
        <div className="App">
    
            <header className="App-header">
    
                <span className='Logo'><Link to="/">MyAirConditioner</Link></span>
        
                <NavBar/>
    
            </header>
    
            <main className='App-main'>
    
                <section className='Home-status'>

                    <div>
                        Current Date Time:{" "}
                        {CurrentDateTimeQuery.isLoading? 
                            <span>loading...</span>
                            :
                            CurrentDateTimeQuery.error?
                                <span>{JSON.stringify(CurrentDateTimeQuery.error)}</span>
                                :
                                CurrentDateTimeQuery.data?
                                    <span>{CurrentDateTimeQuery.data.dateTimeString}</span>
                                    :
                                    null
                                
                        }
                    </div>

                    <div>
                        Temperature Sensor is Working:{" "}
                        {TemperatureSensorStatusQuery.isLoading? 
                            <span>loading...</span>
                            :
                            TemperatureSensorStatusQuery.error?
                                <span>{JSON.stringify(TemperatureSensorStatusQuery.error)}</span>
                                :
                                TemperatureSensorStatusQuery.data?
                                    <span>{JSON.stringify(TemperatureSensorStatusQuery.data.temperatureSensorStatus)}</span>
                                    :
                                    null
                                
                        }
                    </div>

                    <div>
                        Last Temperature registered:{" "}
                        {TemperatureQuery.isLoading? 
                            <span>loading...</span>
                            :
                            TemperatureQuery.error?
                                <span>{JSON.stringify(TemperatureQuery.error)}</span>
                                :
                                TemperatureQuery.data?
                                    <span>{JSON.stringify(TemperatureQuery.data.temperature)}°C</span>
                                    :
                                    null
                                
                        }
                    </div>
                    
                    <div>
                        Air Conditioner Controller is Working:{" "}
                        {AirConditionerControllerStatusQuery.isLoading? 
                            <span>loading...</span>
                            :
                            AirConditionerControllerStatusQuery.error?
                                <span>{JSON.stringify(AirConditionerControllerStatusQuery.error)}</span>
                                :
                                AirConditionerControllerStatusQuery.data?
                                    <span>{JSON.stringify(AirConditionerControllerStatusQuery.data.airConditionerControllerStatus)}</span>
                                    :
                                    null
                                
                        }
                    </div>

                    <div>
                        Last Air Conditioner isOn:{" "}
                        {AirConditionerStatusQuery.isLoading? 
                            <span>loading...</span>
                            :
                            AirConditionerStatusQuery.error?
                                <span>{JSON.stringify(AirConditionerStatusQuery.error)}</span>
                                :
                                AirConditionerStatusQuery.data?
                                    <span>{JSON.stringify(AirConditionerStatusQuery.data.airConditionerStatus)}</span>
                                    :
                                    null
                                
                        }
                    </div>
                    
                    {CurrentDateTimeQuery.data?
                        <div className="Ambient-simulator">
                            <img className="Air-conditioner" src={airConditioner} alt="air conditioner"/>
                            {AirConditionerStatusQuery.data?.airConditionerStatus?
                                <WavesIcon className="Waves"/>
                                :
                                null
                            }
                            {
                                (TemperatureQuery.data?.temperature > 25)?
                                    <img className="Temperature" src={temperatureHeat} alt="temperature" />
                                    :
                                    <img className="Temperature" src={temperatureCold} alt="temperature" />
                            }
                            <WindowIcon className="Window" id="window"/>
                            <img className="Person" src={person} alt="person"/>
                        </div>
                        :
                        null
                    }

                </section>
            
            </main>
    
        </div>
    );
}