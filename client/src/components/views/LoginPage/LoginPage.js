import {useDispatch} from 'react-redux';
import React, {useState} from 'react'
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onNameEvent = (event) => {
    setName(event.currentTarget.value);
    console.log(event.currentTarget.value);
  }
  const onPasswordEvent = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onSubmit = (event) => {
    event.preventDefault();
    let body ={
      name: Name,
      password: Password
    };
    dispatch(loginUser(body)).then(response => {
      if(response.payload.loginSuccess) {
          navigate('/test');
      }else {
        alert('Error : ' + response.payload.message);
      }
    })

  }

  return (
    <div>
      <div class="loginpage">Login Page
                    <form onSubmit={onSubmit}>
                      <label>Name</label>
                      <input type="text" value={Name} onChange={onNameEvent}/>
                      <label>Password</label>
                      <input type="password" value={Password} onChange={onPasswordEvent}/>
                      <br/>
                      <button>Login</button>
                    </form>
            </div>      
    </div>
  )
}

export default LoginPage;