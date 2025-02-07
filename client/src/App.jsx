import { useState,useEffect } from 'react';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; 

import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';

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
        <Route path="/" element={user ? <h1>Welcome, {user.email}</h1> : <Login />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<Login/>} />
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
