import axios from "axios";
import { FIND_LOCATION, FIND_STORE } from "./types";

export function findcountry(body) {
    let req = axios.post('/api/map/city', body).then((res)=>{
        return JSON.parse(res.data)
    })
    // const data = JSON.parse(req.data)
    
    return {
        type : FIND_LOCATION,
        payload : req
    }
}

export function findStore(x, y) {
    const body = {x: x, y: y}
    let req = axios.post('/api/store', body).then((res) =>{
        return JSON.parse(res.data)
    })
    return {
        type : FIND_STORE,
        payload : req
    }
}
