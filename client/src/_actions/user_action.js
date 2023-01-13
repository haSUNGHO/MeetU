import axios from "axios";
import {LOGIN_USER, REGISTER_USER} from "./types";


export function loginUser(body) {
    const req = axios.post('/api/login', body).then(response =>(response.data))
    console.log('req : '+ req);
    return {
        type : LOGIN_USER,
        payload : req
    }
}

export function registerUser(body){
    const req = axios.post('/api/register', body).then(response => (response.data))
    return {
        type : REGISTER_USER,
        payload : req
    }
}