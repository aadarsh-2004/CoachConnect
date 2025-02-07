import React from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div className='min-h-screen min-w-screen bg-white flex items-center justify-center p-4'>
      <div className='container max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row'>
        {/* Right Section - Moved to top for mobile, hidden for md and up */}
        <div className='w-full h-[180px] md:hidden flex justify-center items-center bg-black rounded-t-xl'>
          <img
            src="loginlogo.png"
            alt="Decorative artwork"
            className='w-[200px] h-[150px] rounded-2xl'
          />
        </div>

        {/* Left Section */}
        <div className='w-full md:w-1/2 p-8 md:p-6 m-0'>
          <div className='max-w-sm mx-auto'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Welcome Back 👋
            </h1>
            <p className='text-gray-500 font-serif mb-4'>
              Today is a new day. It's your day.
              <br />
              Sign in to ConnectCoach.
            </p>

            <form className='space-y-1 p-4 bg-gray-50 shadow-xl border-dashed border-gray-300  border-2  rounded-2xl'>
              <div className='space-y-1 w-full md:px-4 md:py-1'>
                <label htmlFor="email" className='text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder='Example@email.com'
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                />
              </div>

              <div className='space-y-1 md:px-4 md:py-1'>
                <label htmlFor="password" className='text-sm font-medium text-gray-700'>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder='At least 8 characters'
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                />
              </div>

              <div className='text-right md:px-4'>
                <Link to="#" href="#" className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className='w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium'
              >
                Sign in
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Or</span>
                </div>
              </div>

              <div className='space-y-4'>
                <button className='w-full flex items-center justify-center gap-2 border font-mono border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors duration-200'>
                  <img src="https://w7.pngwing.com/pngs/63/1016/png-transparent-google-logo-google-logo-g-suite-chrome-text-logo-chrome-thumbnail.png" alt="Google logo" className="w-5 h-5" />
                  Sign in with Google
                </button>
                
                <button className='w-full font-mono flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors duration-200'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/768px-2023_Facebook_icon.svg.png" alt="Facebook logo" className="w-5 h-5" />
                  Sign in with Facebook
                </button>
              </div>

              <p className="text-center text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Section - Hidden for mobile, shown for md and up */}
        <div className='hidden md:flex md:w-1/2 bg-black md:justify-center md:items-center rounded-r-xl'>
          <img
            src="loginlogo.png"
            alt="Decorative artwork"
            className='w-[450px] h-[400px] rounded-2xl'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;