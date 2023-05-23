import { useQuery } from "react-query";
import axios from '../libs/axios';

export default function AirConditionerControllerStatus() {
    const AirConditionerControllerStatusQuery = useQuery("AirConditionerControllerStatus", async () => {
        try {

            const response = await axios.get("/airConditioner/controllerStatus");
            
            return {airConditionerControllerStatus: response.data};

        } catch (err) {

            return {airConditionerControllerStatus: null};

        }
    }, {
        enabled: true,
        staleTime: 200 //0,2s
    });

    return AirConditionerControllerStatusQuery;
}