import { useQuery } from "react-query";
import axios from '../libs/axios';

export default function TemperatureSensorStatus() {
    const TemperatureSensorStatusQuery = useQuery("TemperatureSensorStatus", async () => {
        try {

            const response = await axios.get("/temperature/sensorStatus");
            
            return {temperatureSensorStatus: response.data};

        } catch (err) {

            throw new Error("server is down");

        }
    }, {
        enabled: true,
        staleTime: 200 //0,2s
    });

    return TemperatureSensorStatusQuery;
}