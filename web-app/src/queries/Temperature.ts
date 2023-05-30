import { useQuery } from "react-query";

import axios from '../libs/axios';
import { AxiosError, isAxiosError } from "axios";


export default function Temperature(temperatureSensorStatus: undefined | boolean) {

    const TemperatureQuery = useQuery <{temperature: number}, Error> ("Temperature", async () => {
        try {

            const response = await axios.get("/temperature/status");
            
            return {temperature: response.data};

        } catch (err: unknown) {

            const error = err as (Error | AxiosError);

            if(isAxiosError(error)){
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx 
                    return error.response.data;
                }
                else if (error.request) {
                    // The request was made but no response was received
                    throw new Error("Server couldn't response this request.");
                } 
            }
            else{
                throw new Error(error.message);
            }

        }
    }, {
        enabled: temperatureSensorStatus?true:false,
        retry: false, //dont need it, because it will refetch even if it fails each 0.2s 
        refetchOnWindowFocus: false,
        staleTime: 0, //if its 0 it will always fetch the data again but it continues using cache as fallback while loading the query
        //cacheTime: 0, //with cacheTime as 0, the cache it will always be invalid and it will no be used as fallback
        refetchInterval: data=>data?200:false, //only start refetching with interval, once the request was successful
    });

    return TemperatureQuery;
}