import React from "react"
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findStore } from "../../../_actions/location_action";

function Store() {
    const location = useLocation();
    const dispatch = useDispatch();
    dispatch(findStore(location.state.country)).then({
        
    })
    return (
        <div> gdqgioqghqouiehqgoqeiheqiotest</div>
        )
}

export default Store;