import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookSignIn = async () => {
    setError('');
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='min-h-screen min-w-screen bg-black flex items-center justify-center p-4 relative '>
      {/* Decorative Circles */}
      <div className='absolute top-[-100px] left-[5%] w-52 h-52 rounded-full bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 blur-2xl z-0'></div>
      <div className='absolute bottom-[10px] right-[5%] w-36 h-36 rounded-full bg-gradient-to-r from-cyan-600/20 to-purple-600/20 blur-xl z-0'></div>
      <div className='absolute top-[15%] right-[15%] w-32 h-32  rounded-full bg-gradient-to-r from-purple-400/20 to-cyan-400/20 blur-lg z-0'></div>
      <div className='absolute top-[30%] left-[25%] w-48 h-48 rounded-full bg-gradient-to-r from-cyan-600/20 to-purple-400/20 blur-md z-0'></div>



      <div className='w-[500px] mx-auto bg-transparent p-6 space-y-6'>
        <h1 className='text-4xl font-bold text-white text-center mb-4'>
          Login Now
        </h1>
        <p className='text-white font-serif text-center mb-6'>
          Sign in to continue your journey with <span className='text-cyan-400'>  Mentor.ai </span>  
        </p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className='space-y-4 p-6 bg-white/10 shadow-lg backdrop-blur-md border-2 border-dashed border-gray-300 rounded-2xl'>
          <div className='space-y-2'>
            <label htmlFor="email" className='text-sm font-medium text-white'>Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all'
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor="password" className='text-sm font-medium text-white'>Password</label>
            <input
              type="password"
              id="password"
              required
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-3 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all'
            />
          </div>

          <div className='text-right'>
            <Link to="#" className='text-blue-600 hover:text-blue-800 text-sm font-medium'>Forgot Password?</Link>
          </div>

          <button type="submit" className='w-full bg-black  font-medium border-cyan-500 border-2 text-white py-3 px-4 rounded-lg hover:bg-cyan-500 hover:text-black transition-colors duration-200'>
            Sign in
          </button>

          <div className="relative">
            
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-200">Or</span>
            </div>
          </div>

          <div className='space-y-4'>
            <button type="button" onClick={handleGoogleSignIn} className='text-[14px] text-white w-full flex items-center justify-center gap-2 border font-mono border-gray-300 rounded-lg px-4 py-3  '>
              <img src="https://w7.pngwing.com/pngs/63/1016/png-transparent-google-logo-google-logo-g-suite-chrome-text-logo-chrome-thumbnail.png" alt="Google logo" className="w-5 h-5" />
              Sign in with Google
            </button>

            {/* <button type="button" onClick={handleFacebookSignIn} className='text-[14px] text-white w-full font-mono flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors duration-200'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/768px-2023_Facebook_icon.svg.png" alt="Facebook logo" className="w-5 h-5" />
              Sign in with Facebook
            </button> */}
          </div>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
