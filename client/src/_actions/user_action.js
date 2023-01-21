import axios from "axios";
import {LOGIN_USER, REGISTER_USER, AUTH_USER} from "./types";


export function loginUser(body) {
    const req = axios.post('/api/login', body).then(response =>(response.data))
    console.log('req : '+ req.data);
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
export function auth(){
    const req = axios.get('/api/auth')
        .then(response => (response.data))
    return {
        type : AUTH_USER,
        payload : req
    }
}