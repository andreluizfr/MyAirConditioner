import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:8080/api"
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = "http://localhost:3000"; 

export default instance;