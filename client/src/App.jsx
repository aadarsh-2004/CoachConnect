import { useState } from 'react';

import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';
function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<Login/>} />
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
