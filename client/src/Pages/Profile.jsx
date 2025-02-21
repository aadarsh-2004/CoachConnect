import React from 'react'
import MainNavbar from '../Components/UserDashboard.js/MainNavbar'
import EditProfile from '../Components/ExpertComponent/EditProfile'
function Profile() {
  return (
    <div className='bg-black min-h-screen relative'>
        {/* Decorative Circles */}
      <div className='absolute top-[10px] left-[-5%] w-72 h-72 rounded-full bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 blur-2xl z-0'></div>
      <div className='absolute bottom-[120px] right-[1%] w-56 h-56 rounded-full bg-gradient-to-r from-cyan-600/20 to-purple-800/20 blur-xl z-0'></div>
      <div className='absolute top-[5%] right-[35%] w-32 h-32  rounded-full bg-gradient-to-r from-purple-900/20 to-cyan-400/20 blur-lg z-0'></div>
      {/* <div className='absolute top-[30%] left-[25%] w-48 h-48 rounded-full bg-gradient-to-r from-cyan-800/20 to-cyan-600/20 blur-md z-0'></div> */}
        <MainNavbar/>
        <EditProfile/>

    </div>
  )
}

export default Profile
