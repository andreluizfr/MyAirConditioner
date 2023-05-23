import { useQuery } from "react-query";
import axios from '../libs/axios';

export default function AirConditionerStatus() {
    const AirConditionerStatusQuery = useQuery("AirConditionerStatus", async () => {
        try {

            const response = await axios.get("/airConditioner/status");
            
            return {airConditionerStatus: response.data};

        } catch (err) {

            throw new Error("server is down");

        }
    }, {
        enabled: true,
        staleTime: 200 //0,2s
    });

    return AirConditionerStatusQuery;
}