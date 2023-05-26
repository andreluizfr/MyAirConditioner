import axios from 'axios';

class TemperatureSensor{

    constructor() {
        this.temperature;
    }

    async init (temperature, delayTime) {
        this.temperature = temperature;
        //using bind to not lose the context of this
        setInterval(this.sendTemperatureSignalToServer.bind(this), delayTime);
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