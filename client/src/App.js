import './App.css';
import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import Example from './components/Example';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/Register';
function App() {
  return (
   <BrowserRouter>
      <div className='App'>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/axios" element={<Example/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/register' element={<RegisterPage/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
