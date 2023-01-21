import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "./../_actions/user_action";



//option
// null > 모두 출입 가능함
// true > 로그인한 유저만 출입이 가능하다.
// false > 로그인한유저는 출입이 불가능하다.


export default function Auth (SpecificCompoment, option, adminRoute = null){
    function AuthentificationCheck(){
        const dispatch = useDispatch();
        const navigate = useNavigate();
        useEffect(()=> {
            dispatch(auth()).then(response => {
                console.log(response);
                if(!response.payload.isAuth){
                    if(option) {
                        alert('로그인 후 이용이 가능합니다.');
                        navigate('/login');
                    }
                } else {
                    if(adminRoute && !response.payload.isAuth) {
                        alert('관리자 전용 페이지입니다.');
                        navigate('/');
                    } else {
                        if(option === false) {
                            alert('이미 로그인된 사용자입니다.');
                            navigate('/');
                        }
                    }
                }
            })
        }, []);
        return (
        <SpecificCompoment/>
        );
    }
    return AuthentificationCheck;
}