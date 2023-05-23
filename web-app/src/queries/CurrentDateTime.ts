import { useQuery } from "react-query";
import axios from '../libs/axios';

export default function CurrentDateTime() {
    const CurrentDateTimeQuery = useQuery("CurrentDateTime", async () => {
        try {

            const response = await axios.get("/time/current");
            
            return {dateTimeString: (new Date(response.data)).toLocaleString()};

        } catch (err) {

            throw new Error("server is down");

        }
    },
    {
        enabled: true,
        staleTime: 200 //0,2s
    });

    return CurrentDateTimeQuery;
}
