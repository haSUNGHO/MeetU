import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findcountry } from '../../../_actions/location_action';
// const {kakao} = window;
function Map() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [locationNum, setlocationNum] = useState("");


    // 지도생성하는방법
    // useEffect(() =>{
    // var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    // var options = { //지도를 생성할 때 필요한 기본 옵션
    //     center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    //     level: 3 //지도의 레벨(확대, 축소 정도)
    // };

    // var map = new kakao.maps.Map(container, options);
    // }, [])
    const submit = (event) => {
        event.preventDefault();
    }

    const findSeoul = () => {
        let locationNum = {
            locationnum : 2
        }
        dispatch(findcountry(locationNum)).then(response => {
            if(!response.type){
                alert('지도정보가 전달되지 않았습니다.');
                navigate('/map');
            }else {
                console.log("MAp Success!");
                navigate('/');
            }
        })
    }

    return (
        <div class="page">
            <form class="form" onClick={submit}>
                <button onClick={findSeoul}>서울</button>
                <button>경기도</button>
                <button>인천</button>
                <button>강원도</button>
                <button>충청북도</button>
                <button>충청남도</button>
                <button>대전</button>
                <button>전라북도</button>
                <button>전라남도</button>
                <button>광주</button>
                <button>경상북도</button>
                <button>대구</button>
                <button>울산</button>
                <button>경상남도</button>
                <button>부산</button>
                <button>제주도</button>

                {/*지도 생성하는방법
                 <div id="map" class="mapstyle"></div> */}
            </form>
        </div>
    )
}


export default Map;