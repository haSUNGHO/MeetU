import React from "react";

function frontpage() {

    let mainText = document.getElementsByClassName("slide1")[0];
    let mainText2 = document.getElementsByClassName("slide2")[0];
    window.addEventListener('scroll', function () {
        let value = window.scrollY;
        console.log("scrollY = " + value);
        if (value > 400) {
            mainText.style.animation = "disappear 1.5s ease-out forwards";
            mainText2.style.animation = "slide 1.5s ease-out forwards";
        } else if (value < 400) {
            mainText.style.animation = "slide 1.5s ease-out forwards";
            mainText2.style.animation = "disappear 1.5s ease-out forwards";
        }
    });

    return (
        <section>
            <div class="text-contents">
                <span class="slide1">
                    <h2>MeetU 는?</h2>오랜만에 모이는 동창회, 지인과의 만남의 자리, 연인과의 데이트 장소를 정할 때 거리나 교통 편의상의 문제로 계획 세우기에 도움을 드리고자, 장소추천 모임 계획 제공사이트입니다.
                </span>
                <span class="slide2">
                    <h2>계획하자 !</h2>
                    자, 그럼 지인들과 함께 소중한 시간을 만들어 볼까요?
                    <br />
                    <button class="login-btn1">Login</button>
                </span>
            </div>
        </section>
    );
};
export default frontpage;