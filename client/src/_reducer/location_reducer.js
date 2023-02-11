import { FIND_LOCATION } from "../_actions/types";

export default function country(state = {}, action) {
    switch (action.type) {
        case FIND_LOCATION :
            return{ ...state, locations: action.payload }
        default: 
            return state;    
    }
}