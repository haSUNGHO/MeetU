import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../_actions/user_action";
const header = document.getElementById("header");

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginCheck, setloginCheck] = useState(false);
    dispatch(auth()).then(response => {
        console.log(response.payload.isAuth);
        if(response.payload.isAuth){
            setloginCheck(true);
        }else {
            setloginCheck(false);
        }
    })
    const onLogin = () => {
        navigate('/login');
    }
    const onLogout = () => {

        axios.get('/api/logout').then(response => {
            if (response.data.logoutSuccess) {
                alert('정상 로그아웃 되셨습니다.');
                navigate(0);
            } else {
                alert('로그아웃에 실패했습니다.');
            }

        }).catch(err => {
            console.log('err : ' + err);
        })
    }
    const clicklogo = () => {
        navigate('/');   
    }

    const mapPageGo = () => {
        navigate('/map');
    }

    return (
        <div class="header-div">
            <div class="header-left"><button onClick={clicklogo}><img class="logoimage" src={require('../../../img/logo2.png')} /></button></div>
            <div class="header-center">
                <button onClick={mapPageGo}><img class="location-img" src={require('../../../img/pin-stage.png')}/></button>
                <button><img class="search-img" src={require('../../../img/search-icon.png')}/></button>
                <button><img class="preview-img" src={require('../../../img/preview.png')}/></button>
            </div>
            <div class="header-right">
                {loginCheck ? 
                 
                <button class="header-logoutbtn" onClick={onLogout}>로그아웃</button>
                : <button class="header-loginbtn" onClick={onLogin}>로그인</button>

                }
            </div>
        </div>

    )
}

export default Header;