import {memo, useEffect} from 'react';

import airConditioner from "../assets/air-conditioner.png";
import {ReactComponent as WavesIcon} from "../assets/waves-thin.svg";
import {ReactComponent as WindowIcon} from "../assets/window.svg";
import person from "../assets/person.png";
import temperatureHeat from "../assets/temperature-heat.png";
import temperatureCold from "../assets/temperature-cold.png";

interface AmbientSimulatorProps {
    currentDate: {dateTimeString: string} | undefined,
    temperatureSensorStatus: boolean | undefined,
    temperature: number | undefined,
    airConditionerControllerStatus: boolean | undefined,
    airConditionerStatus: boolean | undefined,
}

function AmbientSimulator({currentDate, temperatureSensorStatus, temperature, airConditionerControllerStatus, airConditionerStatus}: AmbientSimulatorProps){

    useEffect(()=>{
        if(currentDate){
            const hours = Number(currentDate.dateTimeString.split(" ")[1].split(":")[0]);

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
            
            const el = document.getElementById("window") as HTMLElement | undefined;
            if(el)
                el.style.cssText = "background-color: "+windowBackgroundColor+";";
        }
        
    }, [currentDate, temperatureSensorStatus, airConditionerControllerStatus]);

    if(currentDate && temperatureSensorStatus && airConditionerControllerStatus)
        return (
            <div className="Ambient-simulator">
                <img className="Air-conditioner" src={airConditioner} alt="air conditioner"/>
                
                {
                airConditionerStatus && <WavesIcon className="Waves"/>
                }

                {
                temperature!==undefined &&
                    <span className="Temperature">
                        {temperature}°C
                    </span>
                }

                {
                (temperature!==undefined && temperature>25)?
                    <img className="TemperatureSensor" src={temperatureHeat} alt="temperature" />
                    :
                    <img className="TemperatureSensor" src={temperatureCold} alt="temperature" />
                }

                <WindowIcon className="Window" id="window"/>

                {Number(currentDate.dateTimeString.split(" ")[1].split(":")[0])<13?
                    <span className="Time">
                        {Number(currentDate.dateTimeString.split(" ")[1].split(":")[0])+" am"}
                    </span>
                    :
                    <span className="Time">
                        {String((Number(currentDate.dateTimeString.split(" ")[1].split(":")[0])-12))+" pm"}
                    </span>
                }

                <img className="Person" src={person} alt="person"/>
            </div>
        );

    else return <></>;
}

const memoizedAmbientSimulator = memo(AmbientSimulator);

export default memoizedAmbientSimulator;