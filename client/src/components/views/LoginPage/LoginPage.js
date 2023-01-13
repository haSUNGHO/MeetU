import { useDispatch } from 'react-redux';
import React, { useState } from 'react'
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onNameEvent = (event) => {
    setName(event.currentTarget.value);
  }
  const onPasswordEvent = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onSubmit = (event) => {
    event.preventDefault();
    let body = {
      name: Name,
      password: Password
    };
    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        navigate('/');
      } else {
        alert('Error : ' + response.payload.message);
      }
    })

  }

  return (
    <div class="page">
        <form onSubmit={onSubmit} class="form">
          <div class="loginlogo">로그인</div>
          <input type="text" placeholder="닉네임" value={Name} onChange={onNameEvent}  />
          <label>{Name === "" ? "닉네임을 입력해주세요" : ""}</label>
          <input type="password" placeholder="패스워드" value={Password} onChange={onPasswordEvent}/>
          <label>{Password === "" ? "비밀번호를 입력해주세요" : ""}</label>
          <br />
          <button>Login</button>
          <span>혹시, 처음이신가요 ? <a class="login_hyperlink" href="/register">지금 가입하세요.</a></span>
          <span>또는, 기억이 잘 안나시나요 ? <a class="login_hyperlink" href="/finduser">찾을 수 있어요.</a></span>
        </form>
    </div>
  )
}

export default LoginPage;