import axios from "axios";
import { FIND_LOCATION } from "./types";

export function findcountry(body) {
    const req = axios.post('/api/map/city', body).then(response => (response.data))
    return {
        type : FIND_LOCATION,
        payload : req
    }
}
