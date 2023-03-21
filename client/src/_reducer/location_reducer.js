import { FIND_LOCATION, FIND_STORE } from "../_actions/types";

export default function country(state = {}, action) {
    switch (action.type) {
        case FIND_LOCATION :
            return{ ...state, locations: action.payload }
        case FIND_STORE : 
            return { ...state, stores: action.payload}
        default: 
            return state;    
    }
}