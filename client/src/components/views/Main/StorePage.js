import React from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findStore } from "../../../_actions/location_action";

function Store() {
    const location = useLocation();
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    dispatch(findStore(location.state.country)).then(response => {
       if(!response.type){
        alert('데이터가 없거나 불러오는데 실패하였습니다.')
       }
    })
    return (
        <div> gdqgioqghqouiehqgoqeiheqiotest</div>
        )
}

export default Store;