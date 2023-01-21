import './App.css';
import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import ExamplePage from './components/Example';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/Register';
import Header  from './components/views/Header/Header';
import Nav from './components/views/NavBar/NavBar';
import Auth from './hoc/auth';
function App() {
  const Landding = Auth(LandingPage, null);
  const Example = Auth(ExamplePage, true);
  const Login = Auth(LoginPage, false);
  const Register = Auth(RegisterPage, false);
  return (
   <BrowserRouter>
      <div className='App'>
        <header><Header/></header>
      <Routes>
        <Route exact path="/" element={<Landding/>}/>
        <Route exact path="/axios" element={<Example/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
