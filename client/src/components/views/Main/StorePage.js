import { React, useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findStore } from "../../../_actions/location_action";
function goStation() {
    console.log("test :-0");
};
function Store() {
    const [storelist, setstorelist] = useState([]);
    const location = useLocation();
    const dispatch = useDispatch();
    const arr = [];
    // const navigate = useNavigate();
    useEffect(() => {

        dispatch(findStore(location.state.country)).then(response => {
            if (!response.type) {
                alert('데이터가 없거나 불러오는데 실패하였습니다.')
            } else {
                response.payload.forEach(element => {
                    arr.push(element)
                });

                 setstorelist(arr);
                
            }
        })
    }, [])

    return (
        <div class="page">
            <form class="store_form">{storelist.length === 0 ? "none Data" : storelist.map((el)=> <button onClick={goStation}>{el.name}<br/>{el.address}<br/><img src={el.image[0]}></img></button>)}</form>
        </div>
        
    )
}

export default Store;