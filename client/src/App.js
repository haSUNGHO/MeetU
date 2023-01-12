import './App.css';
import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import Example from './components/Example';
import LoginPage from './components/views/LoginPage/LoginPage';

function App() {
  return (
   <BrowserRouter>
      <div className='App'>
      <Routes>
        <Route exact path="/test" element={<LandingPage/>}/>
        <Route exact path="/axios" element={<Example/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
