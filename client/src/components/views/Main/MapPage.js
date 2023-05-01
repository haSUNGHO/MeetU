import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findcountry, findStore } from '../../../_actions/location_action';
const { kakao } = window;
function setlocation(map, value) {
    console.log(value);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(value, function (result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {

            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">'+value +'</div>'
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        }
    });



    // // 이동할 위도 경도 위치를 생성합니다 
    // var moveLatLng = new kakao.maps.LatLng(x, y);
    // // 지도 중심을 이동 시킵니다
    // var marker = new kakao.maps.Marker({
    //     position: moveLatLng
    // });
    // marker.setMap(map);
    // map.setCenter(moveLatLng);
}

function Map() {
    const locationRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [countryList, setcountryList] = useState([])
    var kakaomap
    useEffect(() => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 4, //지도의 레벨(확대, 축소 정도)
            draggable: false,
            scrollwheel: false
        };
        kakaomap = new kakao.maps.Map(container, options);

    })

    console.log(kakaomap)
    const submit = (event) => {
        event.preventDefault();
    }

    const findLocation = (event) => {
        let locationNum = {
            locationnum: event.target.value
        }
        dispatch(findcountry(locationNum)).then(response => {
            if (!response.type) {
                alert('지도정보가 전달되지 않았습니다.');
                navigate('/map');
            } else {
                const countryarr = []
                console.log(response.payload)
                // response.payload.map((el)=> {console.log(el.country)})
                response.payload.forEach(element => {
                    countryarr.push(element)
                });
                setcountryList(countryarr);
                console.log(countryList)
                // if(response.payload !== undefined){
                //     return (<div class="countryPage">{response.payload.map((el)=> {
                //         <button>{el.country}</button>
                //     })} </div>)
                // }else{
                //     alert('해당 지역에 행정구역 정보가 표시되지 않습니다.')
                //     navigate('/map')
                // }
            }
        }
        )

    }
    const golocal = (event) => {
        event.preventDefault();
    }
    const onMousehover = (event) => {
        var mapcon = document.getElementById('map');
        console.log("mouseHover :)")
        console.log(event.target.value)
        setlocation(kakaomap, event.target.value)
    }
    const onClickgoMap = (event) => {
        console.log(event.target.value)
        navigate('/Store', { state: { country: event.target.value } })
    }

    return (

        <div class="page">
            {countryList.length === 0 ?
                <form class="form" onClick={submit}>
                    <button value={2} onClick={findLocation} >서울</button>
                    <button value={31} onClick={findLocation}>경기도</button>
                    <button value={32} onClick={findLocation}>인천</button>
                    <button value={33} onClick={findLocation}>강원도</button>
                    <button value={43} onClick={findLocation}>충청북도</button>
                    <button value={41} onClick={findLocation}>충청남도</button>
                    <button value={42} onClick={findLocation}>대전</button>
                    <button value={63} onClick={findLocation}>전라북도</button>
                    <button value={61} onClick={findLocation}>전라남도</button>
                    <button value={62} onClick={findLocation}>광주</button>
                    <button value={54} onClick={findLocation}>경상북도</button>
                    <button value={53} onClick={findLocation}>대구</button>
                    <button value={52} onClick={findLocation}>울산</button>
                    <button value={55} onClick={findLocation}>경상남도</button>
                    <button value={51} onClick={findLocation}>부산</button>
                    <button value={64} onClick={findLocation}>제주도</button>
                </form>
                :
                <form class="location_form" onClick={golocal}>
                    {countryList.map((el) => <button onMouseOver={onMousehover} onClick={onClickgoMap} value={el.country}>{el.country}</button>)}
                </form>}
            <div id="map" class="mapstyle" value="3"></div>


        </div>
    )
}


export default Map;