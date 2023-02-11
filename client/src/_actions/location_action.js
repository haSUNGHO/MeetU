import axios from "axios";
import { FIND_LOCATION } from "./types";

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
