import React from 'react';

function HeroSection() {
  return (
    <div className='relative top-12 md:top-24  flex flex-col items-center justify-center min-h-[60vh] px-4 md:px-6 lg:px-8'>
      {/* Decorative Circles - Adjusted for responsive layout */}
      <div className='absolute top-[-30px] md:top-[-50px] left-[5%] md:left-[10%] w-20 md:w-32 h-20 md:h-32 rounded-full bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 blur-2xl'></div>
      <div className='absolute bottom-[-20px] md:bottom-[-30px] right-[5%] md:right-[15%] w-24 md:w-40 h-24 md:h-40 rounded-full bg-gradient-to-r from-cyan-600/20 to-purple-600/20 blur-xl'></div>
      <div className='absolute top-[10%] md:top-[20%] right-[10%] md:right-[20%] w-16 md:w-24 h-16 md:h-24 rounded-full bg-gradient-to-r from-purple-400/20 to-cyan-400/20 blur-lg'></div>

      {/* Heading - Responsive text sizes */}
      <div className='text-center relative z-10'>
        <h1 className='text-white font-roboto text-[40px] sm:text-[50px] md:text-[70px] lg:text-[80px] leading-tight'>
          <span className='text-cyan-400 font-poppins font-bold'>Mentor</span> 
          <span className='font-medium font-poppins'> Minds,</span>
          <br />
          <span className='text-[30px] sm:text-[45px] md:text-[52px] lg:text-[60px] font-poppins font-medium'>
            One Click Away
          </span>
        </h1>

        <p className='text-white  text-[15px] sm:text-[22px] md:text-[24px] lg:text-[28px] mt-4 md:mt-6 max-w-[78%] md:max-w-5xl mx-auto'>
          Get personalized expert advice with 
          <span className='text-cyan-400'> AI-enhanced </span>
          consultation experience
        </p>
      </div>

      {/* Small circle accents - Adjusted visibility and position for mobile */}
      <div className='absolute top-[40%] left-[15%] md:left-[25%] w-2 md:w-3 h-2 md:h-3 rounded-full bg-cyan-500/50'></div>
      <div className='absolute bottom-[20%] md:bottom-[30%] right-[20%] md:right-[30%] w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-cyan-600/50'></div>
      <div className='hidden md:block absolute top-[20%] left-[40%] w-2 h-2 rounded-full bg-purple-400/50'></div>
    </div>
  );
}

export default HeroSection;