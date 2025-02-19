import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send user details to MongoDB
      await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          uid: user.uid, 
          name, 
          email: user.email 
        })
      });

      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  // Google and Facebook Providers
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookSignup = async () => {   
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='min-h-screen min-w-screen bg-black flex items-center justify-center p-4 relative'>
      
      {/* Decorative Circles */}
      <div className='absolute top-[-100px] left-[5%] w-52 h-52 rounded-full bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 blur-2xl z-0'></div>
      <div className='absolute bottom-[10px] right-[5%] w-36 h-36 rounded-full bg-gradient-to-r from-cyan-600/20 to-purple-600/20 blur-xl z-0'></div>
      <div className='absolute top-[15%] right-[15%] w-32 h-32  rounded-full bg-gradient-to-r from-purple-400/20 to-cyan-400/20 blur-lg z-0'></div>
      <div className='absolute top-[30%] left-[25%] w-48 h-48 rounded-full bg-gradient-to-r from-cyan-600/20 to-purple-400/20 blur-md z-0'></div>

      {/* SignUp Form */}
      <div className='w-[400px] md:w-[500px] mx-auto bg-transparent z-10 relative'>
        <h1 className='text-2xl md:text-4xl font-bold text-white text-center mb-4'>
          Create Your Account 
        </h1>
        <p className='text-white font-serif text-center mb-6'>
          Join ConnectCoach and start your journey today.
        </p>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <form onSubmit={handleEmailSignup} className='space-y-4 p-5 bg-white/10 shadow-xl border-dashed border-gray-300 border-2 rounded-2xl'>
          <div className='space-y-1 w-full'>
            <label htmlFor='name' className='text-sm font-medium text-white'>
              Full Name
            </label>
            <input type='text' id='name' required placeholder='John Doe' value={name} onChange={(e) => setName(e.target.value)} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all' />
          </div>

          <div className='space-y-1 w-full'>
            <label htmlFor='email' className='text-sm font-medium text-white'>
              Email
            </label>
            <input type='email' id='email' required placeholder='Example@email.com' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all' />
          </div>

          <div className='space-y-1 w-full'>
            <label htmlFor='password' className='text-sm font-medium text-white'>
              Password
            </label>
            <input type='password' id='password' required placeholder='At least 8 characters' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all' />
          </div>

          <button type='submit' className='w-full bg-black border-2 border-cyan-400 text-white py-3 px-4 rounded-lg font-medium'>
            Sign Up
          </button>

          <div className='relative my-3'>
           
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-transparent text-gray-200'>Or</span>
            </div>
          </div>

          <div className='space-y-4'>
            <button type='button' onClick={handleGoogleSignup} className='text-[13px] text-white md:text-[16px] w-full flex items-center justify-center gap-2 border font-mono border-gray-300 rounded-lg px-4 py-3 '>
              <img src='https://w7.pngwing.com/pngs/63/1016/png-transparent-google-logo-google-logo-g-suite-chrome-text-logo-chrome-thumbnail.png' alt='Google logo' className='w-5 h-5' />
              Sign up with Google
            </button>

            {/* <button type='button' onClick={handleFacebookSignup} className='text-[13px]  text-white md:text-[16px] w-full font-mono flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-3 '>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/768px-2023_Facebook_icon.svg.png' alt='Facebook logo' className='w-5 h-5' />
              Sign up with Facebook
            </button> */}
          </div>

          <p className='text-center text-gray-600 text-sm'>
            Already have an account?{' '}
            <Link to='/signin' className='text-blue-600 hover:text-blue-800 font-medium'>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
