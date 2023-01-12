import axios from "axios";
import {LOGIN_USER} from "./types";

export function loginUser(body) {
    const req = axios.post('/api/login', body).then(response =>(response.data))
    console.log('req : '+ req);
    return {
        type : LOGIN_USER,
        payload : req
    }
}