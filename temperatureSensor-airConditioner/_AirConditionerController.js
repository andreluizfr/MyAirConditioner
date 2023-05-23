import axios from 'axios';

class AirConditionerController{

    constructor() {
        this.isOn;
        this.working;
        this.lastTemperatureRegistered;
        this.currentDate; 
        this.stopDate;
    }

    async init ([startYear, startMonth, startDay, startHour], [endYear, endMonth, endDay, endHour]) {
        //os meses aqui vão de 0 a 11
        this.currentDate = new Date(startYear, startMonth-1, startDay, startHour);
        this.stopDate = new Date(endYear, endMonth-1, endDay, endHour);
        
        this.working = true;
        await this.updateAirConditionerControllerStateInServer(this.working);

        this.isOn = true;
        this.interval = setInterval(this.run.bind(this), 1000);
    }

    async run () {

        if(this.isOn) console.log(this.currentDate.toLocaleDateString(), "de "+this.currentDate.getHours()+" hrs", "até "+(this.currentDate.getHours()+1)+" hrs", " - ligado");
        else console.log(this.currentDate.toLocaleDateString(), "de "+this.currentDate.getHours()+" hrs", "até "+(this.currentDate.getHours()+1)+" hrs", " - desligado");
        console.log("\n");

        try {
            await this.saveOperatingHistoryInServer();

            this.currentDate.setHours(this.currentDate.getHours() + 1);
            
            const {on, temperature} = await this.myNextStep();

            console.log("última temperatura registrada", temperature, "°C");

            this.isOn = on;
            if(this.isOn) console.log("O servidor determinou que o ar condicionado deve permanecer ligado na próxima hora");
            else console.log("O servidor determinou que o ar condicionado deve permanecer desligado na próxima hora");

            await this.updateAirConditionerStateInServer();
        } catch (err) {
            console.log(err.message);
        }

        if(this.currentDate === this.stopDate){
            this.working = false;
            await updateAirConditionerControllerStateInServer(this.working);

            clearInterval(this.interval);

            console.log("Simulação do controlador pra ar condicionado chegou ao fim.",
            "Acesse o site para ver informações sobre histórico do seu funcionamento");
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
            return nextStepResponse.data.data;
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

    async updateAirConditionerControllerStateInServer (working) {
        await axios.post(`${process.env.BASE_API_URL}/airConditioner/updateAirConditionerController?isControllerWorking=${working}`);
    }

}

export default new AirConditionerController();