import axios from 'axios';

const BASE_API_URL = "http://localhost:8080/api";

var isOn = true;

//start at 22/05/2023 on 0 oclock
var currentDate = new Date(2023,4,22,0);

setInterval(async () => {

    const saveHistoryResponse = await axios.post(
        `${BASE_API_URL}/history/saveHistory`,
        {
            day: currentDate.getDate(),
            month: currentDate.getMonth()+1,
            year: currentDate.getFullYear(),
            isOn: isOn,
            hour: currentDate.getHours()
        }
    );
    console.log(saveHistoryResponse.data);

    currentDate.setHours(currentDate.getHours() + 1);
    
    const nextStepResponse = await axios.get(`${BASE_API_URL}/airConditioner/myNextStep`);
    console.log(nextStepResponse.data);
    isOn = nextStepResponse.data.data;

    const updateStatusResponse = await axios.post(`${BASE_API_URL}/airConditioner/updateAirConditioner?isOn=${isOn}`);
    console.log(updateStatusResponse.data);

}, 1000);

