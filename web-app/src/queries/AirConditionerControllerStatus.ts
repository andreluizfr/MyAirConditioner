import { useQuery } from "react-query";
import axios from '../libs/axios';

export default function AirConditionerControllerStatus() {
    const AirConditionerControllerStatusQuery = useQuery <{airConditionerControllerStatus: boolean}, Error> ("AirConditionerControllerStatus", async () => {
        try {

            const response = await axios.get("/airConditioner/controllerStatus");
            
            return {airConditionerControllerStatus: response.data};

        } catch (err: unknown) {

            throw new Error("server is down");

        }
    }, {
        retry: false, //dont need it, because it will refetch even if it fails each 0.2s 
        refetchOnWindowFocus: false,
        staleTime: 0, //if its 0 it will always fetch the data again but it continues using cache as fallback while loading the query
        //cacheTime: 0, //with cacheTime as 0, the cache it will always be invalid and it will no be used as fallback
        refetchInterval: data=>data?200:false,
    });

    return AirConditionerControllerStatusQuery;
}