import { useState,useEffect } from 'react';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; 

import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';


import { BrowserRouter as Router ,Routes ,Route  } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';

function App() {
  const [user ,setuser]=useState(null);
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  
  
   
  return (
    <>
    
    <Router>
    
    
      <Routes>
        
        <Route path="/" element={<LandingPage/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<Login/>} />
        <Route path='/Dashboard' element={<Dashboard/>} />
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
