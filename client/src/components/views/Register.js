import { useDispatch } from 'react-redux';
import React, {useState}from 'react';
import { useNavigate } from 'react-router-dom';
import {registerUser} from '../../_actions/user_action';
function Register() {
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordCheck, setPasswordCheck] = useState("");
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onNameEvent = (event) => {
    setName(event.currentTarget.value);
  }
  const onPasswordEvent = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onPasswordCheckEvent = (event) => {
    setPasswordCheck(event.currentTarget.value);
  }
  const onEmailEvent = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    let body = {
      name: Name,
      password: Password,
      email: Email,
      role: 1
    };
    if(Password !== PasswordCheck) {
      return alert("비밀번호와 비밀번호 확인이 동일하지 않습니다.");
    }

    dispatch(registerUser(body)).then(response => {
      if(response.payload.registerSuccess) {
        navigate('/login');
        alert('회원가입을 완료하셨습니다. 다시 로그인바랍니다.');
      }else {
        alert('Error : '+ response.payload.err);
      }
    })
  }

  return (
    <div class="page">
    <form onSubmit={onSubmit} class="form">
      <div class="loginlogo">회원가입</div>
      <input type="text" placeholder="닉네임" value={Name} onChange={onNameEvent}  />
      <label>{Name === "" ? "닉네임을 입력해주세요" : ""}</label>
      <input type="password" placeholder="패스워드" value={Password} onChange={onPasswordEvent}/>
      <label>{Password === "" ? "비밀번호를 입력해주세요" : ""}</label>
      <input type="password" placeholder="패스워드 확인" value={PasswordCheck} onChange={onPasswordCheckEvent}/>
      <label>{Password === PasswordCheck ? "" : "동일한 비밀번호를 입력해주세요"}</label>
      <input type="email" placeholder="이메일" value={Email} onChange={onEmailEvent}/>
      <label>{Email === "" ? "이메일을 입력해주세요" : ""}</label>
      <br />
      <button>회원가입</button>
      <span>혹시, 처음이신가요 ? <a class="login_hyperlink" href="/register">지금 가입하세요.</a></span>
      <span>또는, 기억이 잘 안나시나요 ? <a class="login_hyperlink" href="/finduser">찾을 수 있어요.</a></span>
    </form>
</div>
  )
}

export default Register