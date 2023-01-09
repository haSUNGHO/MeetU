import './App.css';
import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import Error from './components/views/Error';
import Example from './components/Example';

function App() {
  return (
   <BrowserRouter>
      <div className='App'>
      <Routes>
        <Route exact path="/test" element={<LandingPage/>} errorElement={<Error/>}/>
        <Route exact path="/axios" element={<Example/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
