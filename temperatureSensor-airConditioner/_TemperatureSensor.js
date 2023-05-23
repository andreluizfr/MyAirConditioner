import axios from 'axios';
const BASE_API_URL = "http://localhost:8080/api";

class TemperatureSensor{

    constructor() {
        this.temperature;
    }

    init (temperature) {
        this.temperature = temperature;
        //using bind to not lose the context of this
        setInterval(this.sendTemperatureSignalToServer.bind(this), 1000);
    }

    async sendTemperatureSignalToServer() {
        try{    
            this.temperature = this.generateTemperature();

            const updateTemperatureResponse = 
                await axios.post(`${process.env.BASE_API_URL}/temperature/updateTemperature?temperature=${this.temperature}`);
        } catch (err) {
            console.error("erro ao salvar temperatura no servidor.");
        }
    }

    generateTemperature () {
        //Temperature is number that has range between -10 and 40
        return Math.floor(Math.random()*50) - 10;
    }
 
}

export default new TemperatureSensor();