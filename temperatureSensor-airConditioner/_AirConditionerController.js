import axios from 'axios';

class AirConditionerController{

    constructor() {
        this.isOn;
        this.lastTemperatureRegistered;
        this.currentDate; 
    }

    async init ([startYear, startMonth, startDay, startHour], delayTime) {
        //os meses aqui vão de 0 a 11
        this.currentDate = new Date(startYear, startMonth-1, startDay, startHour);


        this.isOn = true;
        this.interval = setInterval(this.run.bind(this), delayTime);
    }

    async run () {

        if(this.isOn) console.log(this.currentDate.toLocaleDateString(), "de "+this.currentDate.getHours()+" hrs", "até "+(this.currentDate.getHours()+1)+" hrs", " - ligado");
        else console.log(this.currentDate.toLocaleDateString(), "de "+this.currentDate.getHours()+" hrs", "até "+(this.currentDate.getHours()+1)+" hrs", " - desligado");
        console.log("\n");

        try {
            await this.saveOperatingHistoryInServer();

            this.currentDate.setHours(this.currentDate.getHours() + 1);
            
            const {on, temperature, message} = await this.myNextStep();

            console.log("última temperatura registrada", temperature, "°C");

            this.isOn = on;
            if(this.isOn) console.log("O servidor determinou que o ar condicionado deve permanecer ligado na próxima hora");
            else console.log("O servidor determinou que o ar condicionado deve permanecer desligado na próxima hora");

            await this.updateAirConditionerStateInServer();
        } catch (err) {
            console.log(err.message);
        }
            
    }

    async saveOperatingHistoryInServer () {
        try{
            await axios.post(
                `${process.env.BASE_API_URL}/history/saveHistory`,
                {
                    day: this.currentDate.getDate(),
                    month: this.currentDate.getMonth()+1,
                    year: this.currentDate.getFullYear(),
                    isOn: this.isOn,
                    hour: this.currentDate.getHours()
                }
            );
        } catch (err) {
            throw new Error("Erro ao salvar histórico de operação da última hora no servidor.");
        }
    }

    async myNextStep () {
        try {
            const nextStepResponse = await axios.get(`${process.env.BASE_API_URL}/airConditioner/myNextStep`);
            return nextStepResponse.data;
        } catch (err) {
            throw new Error("Erro ao solicitar informação sobre qual operação deve ser feita pelo servidor.");
        }
    }

    async updateAirConditionerStateInServer () {
        try {
            await axios.post(`${process.env.BASE_API_URL}/airConditioner/updateAirConditioner?isOn=${this.isOn}`);
        } catch (err) {
            throw new Error("Erro ao atualizar status do ar condicionado no servidor.");
        }
    }

    async updateTemperatureSensorStateInServer (working) {
        await axios.post(`${process.env.BASE_API_URL}/temperature/updateTemperatureSensor?isWorking=${working}`);
    }

}

export default new AirConditionerController();