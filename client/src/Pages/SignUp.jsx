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
    <div className='min-h-screen min-w-screen bg-gray-100 flex items-center justify-center p-6'>
      <div className='container max-w-6xl bg-white rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden'>
        <div className='hidden md:flex md:w-1/2 bg-black md:justify-center md:items-center p-8'>
          <img src='loginlogo.png' alt='Signup artwork' className='w-[450px] h-[400px] rounded-2xl' />
        </div>

        <div className='w-full h-[180px] md:hidden flex justify-center items-center bg-black rounded-t-xl'>
          <img src='loginlogo.png' alt='Decorative artwork' className='w-[200px] h-[150px] rounded-2xl' />
        </div>

        <div className='w-full md:w-1/2 p-3 md:p-8 bg-white'>
          <div className='max-w-sm mx-auto'>
            <h1 className='text-2xl md:text-3xl font-extrabold text-gray-900 mb-3'>
              Create Your Account 🎉
            </h1>
            <p className='text-gray-500 font-serif mb-5 md:text-xl text-sm'>
              Join ConnectCoach and start your journey today.
            </p>

            {error && <p className='text-red-500 text-sm'>{error}</p>}

            <form onSubmit={handleEmailSignup} className='space-y-4 p-5 bg-gray-50 shadow-xl border-dashed border-gray-300 border-2 rounded-2xl'>
              <div className='space-y-1 w-full'>
                <label htmlFor='name' className='text-sm font-medium text-gray-700'>
                  Full Name
                </label>
                <input type='text' id='name' required placeholder='John Doe' value={name} onChange={(e) => setName(e.target.value)} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all' />
              </div>

              <div className='space-y-1 w-full'>
                <label htmlFor='email' className='text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input type='email' id='email' required placeholder='Example@email.com' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all' />
              </div>

              <div className='space-y-1 w-full'>
                <label htmlFor='password' className='text-sm font-medium text-gray-700'>
                  Password
                </label>
                <input type='password' id='password' required placeholder='At least 8 characters' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all' />
              </div>

              <button type='submit' className='w-full bg-black text-white py-3 px-4 rounded-lg font-medium'>
                Sign Up
              </button>

              <div className='relative my-3'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-gray-50 text-gray-500'>Or</span>
                </div>
              </div>

              <div className='space-y-4'>
                <button type='button' onClick={handleGoogleSignup} className='text-[13px] md:text-[16px] w-full flex items-center justify-center gap-2 border font-mono border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors duration-200'>
                  <img src='https://w7.pngwing.com/pngs/63/1016/png-transparent-google-logo-google-logo-g-suite-chrome-text-logo-chrome-thumbnail.png' alt='Google logo' className='w-5 h-5' />
                  Sign up with Google
                </button>

                <button type='button' onClick={handleFacebookSignup} className='text-[13px] md:text-[16px] w-full font-mono flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors duration-200'>
                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/768px-2023_Facebook_icon.svg.png' alt='Facebook logo' className='w-5 h-5' />
                  Sign up with Facebook
                </button>
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
      </div>
    </div>
  );
};

export default SignUp;