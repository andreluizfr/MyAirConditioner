import { useQuery } from "react-query";
import axios from '../libs/axios';

export default function Temperature() {
    const TemperatureQuery = useQuery("Temperature", async () => {
        try {

            const response = await axios.get("/temperature/status");
            
            return {temperature: response.data};

        } catch (err) {

            return {temperature: null};

        }
    }, {
        enabled: true,
        staleTime: 200 //0,2s
    });

    return TemperatureQuery;
}