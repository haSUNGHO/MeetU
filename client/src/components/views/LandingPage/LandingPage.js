import React, { useState, useEffect } from "react";
    
function frontpage() {
    const [Slider1, setSlider1] = useState(true);
    // const scrollSlider1 = new useRef(null);
    // const scrollSlider2 = new useRef(null);
    // const loginpage = useRef(null);


    window.addEventListener('scroll', function () {
        let value = window.scrollY;
        console.log("scrollY = " + value);
        if (value > 400) {
            // scrollSlider1.current.style.animation = "disappear 1.5s ease-out forwards";
            // scrollSlider2.current.style.animation = "slide 1.5s ease-out forwards";
            setSlider1(false);
        } else if (value < 400) {
            // scrollSlider1.current.style.animation = "slide 1.5s ease-out forwards";
            // scrollSlider2.current.style.animation = "disappear 1.5s ease-out forwards";
            setSlider1(true);
        }


    });

    const loginbtn = () => {
        console.log('btn clicke !!')
        // loginpage.current.style.animation = "printout";
    }
    return (
        <section>
            <div class="text-contents">
                <span class="slide1" style={{animation : Slider1 ? "slide 1.5s ease-out forwards" : "disappear 1.5s ease-out forwards"}}>
                    <h2>MeetU 는?</h2>오랜만에 모이는 동창회, 지인과의 만남의 자리, 연인과의 데이트 장소를 정할 때 거리나 교통 편의상의 문제로 계획 세우기에 도움을 드리고자, 장소추천 모임 계획 제공사이트입니다.
                </span>
                <span class="slide2" style={{animation : Slider1 ? "disappear 1.5s ease-out forwards" : "slide 1.5s ease-out forwards"}}>
                    <h2>계획하자 !</h2>
                    자, 그럼 지인들과 함께 소중한 시간을 만들어 볼까요?
                    <br />
                    <button class="login-btn1" onClick={loginbtn}>Login</button>
                </span>
                <div class="loginpage">
                    <div class="IDplace">
                        닉네임<input type="textarea" placeholder="닉네임을 입력해주세요" />
                    </div>
                    <div class="PWplace">
                        패스워드<input type="password" />
                    </div>
                    <input class="submitbtn">Login</input>
                </div>
            </div>

        </section>
    );
};
export default frontpage;