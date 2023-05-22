import axios from 'axios';

const BASE_API_URL = "http://localhost:8080/api";

var temperature = 0;

function generateTemperature (){
    //Temperature is number which has range between 0 and 50 starting from -10
    return Math.floor(Math.random()*50) - 10;
}


setInterval(async () => {
    
    temperature = generateTemperature();

    const response = await axios.post(`${BASE_API_URL}/temperature/updateTemperature?temperature=${temperature}`);
    console.log(response.data);

}, 1000);

