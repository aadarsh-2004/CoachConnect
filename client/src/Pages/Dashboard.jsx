import React from 'react'
import MainNavbar from '../Components/UserDashboard.js/MainNavbar';
import HeroSection from '../Components/UserDashboard.js/HeroSection';
import CategorySlider from '../Components/UserDashboard.js/CategorySlider';
import ExpertSuggestion from '../Components/UserDashboard.js/ExpertSuggestion';

function Dashboard() {
  return (
    <div className='bg-black h-full'>
      <MainNavbar/> 
      <HeroSection/>
      <CategorySlider/>
      <ExpertSuggestion/>
    </div>
  )
}

export default Dashboard
