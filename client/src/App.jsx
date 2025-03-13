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
import Profile from './Pages/Profile';
import Wallet from './Pages/Wallet';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import VideoCall from './Agora/VideoCall';
// import AudioCall from './Agora/AudioCall';
import Chat from './Agora/Chat';
import Summary from './Components/Summary';

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
    <AuthProvider>
    <Router>
      <Routes>
        
        <Route path="/" element={<LandingPage/>} /> 
        {/* <Route path="/" element={<AudioCall/>} /> 
        <Route path="/" element={<VideoCall/>} /> */}
        <Route path="/" element={<Chat/>} />
        <Route path="/summary" element={<Summary />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<Login/>} />
        <Route path='/Dashboard' element={ <ProtectedRoute><Dashboard/></ProtectedRoute> } />
        <Route path='/profile' element={<ProtectedRoute> <Profile/></ProtectedRoute>} />
        <Route path='/wallet' element={ <ProtectedRoute><Wallet/></ProtectedRoute>} />
        
      </Routes>
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
