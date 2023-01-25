import { combineReducers } from "redux";
import user from './user_reducer';
import country from './location_reducer';

const rootReducer = combineReducers ({
    user,
    country
})

export default rootReducer;