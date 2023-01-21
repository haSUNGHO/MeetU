import axios from "axios";
import React from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogout = () => {

        axios.get('/api/logout').then(response => {
            if (response.data.logoutSuccess) {
                alert('정상 로그아웃 되셨습니다.');
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

    return (
        <div class="header-div">
            <div class="header-left"><button onClick={clicklogo}><img class="logoimage" src={require('../../../img/logo2.png')} /></button></div>
            <div class="header-center">center</div>
            <div class="header-right">
                <button class="logoutbtn" onClick={onLogout}>로그아웃</button>
            </div>
        </div>

    )
}

export default Header;