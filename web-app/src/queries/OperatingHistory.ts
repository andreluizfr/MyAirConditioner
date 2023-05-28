import { useQuery } from "react-query";
import axios from '../libs/axios';
import { AxiosError, isAxiosError } from "axios";
import { OperatingHistory } from '../types/OperatingHistory';
import { DateRange } from "@mui/x-date-pickers-pro";
import { Dayjs } from "dayjs";


export default function OperatingHistoryList(dateRange: DateRange<Dayjs>) {
    const OperatingHistoryQuery = useQuery <{operatingHistory: OperatingHistory[]} | undefined, Error> ("OperatingHistory", async () => {
        try {

            if(dateRange && dateRange[0] && dateRange[1]){
                const response = await axios.get(`/history/getHistory?day1=${dateRange[0].get("date")}&month1=${dateRange[0].get("month")+1}&year1=${dateRange[0].get("year")}&day2=${dateRange[1].get("date")}&month2=${dateRange[1].get("month")+1}&year2=${dateRange[1].get("year")}`);
                return {operatingHistory: response.data as OperatingHistory[]};
            } else return undefined;

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
        enabled: false,
        retry: false, //dont need it, because it will refetch even if it fails each 0.2s 
        refetchOnWindowFocus: false,
        staleTime: 5000, //if its 0 it will always fetch the data again but it continues using cache as fallback while loading the query
        //cacheTime: 0, //with cacheTime as 0, the cache it will always be invalid and it will no be used as fallback
    });

    return OperatingHistoryQuery;
}