import React, { useEffect, useState, useRef } from 'react';
import HeroSection from '../Components/HeroSection';
import Navbar from '../Components/Navbar';

function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const isManualScrolling = useRef(false);
  
  // Calculate section heights and positions
  useEffect(() => {
    const calculateSectionPositions = () => {
      const positions = [];
      for (let i = 1; i <= 4; i++) {
        const section = document.getElementById(`section${i}`);
        if (section) {
          positions.push({
            id: i,
            top: section.offsetTop,
            bottom: section.offsetTop + section.offsetHeight
          });
        }
      }
      return positions;
    };
    
    const handleScroll = () => {
      if (isManualScrolling.current) return;
      
      const currentY = window.scrollY;
      setScrollY(currentY);
      
      // Calculate active section based on scroll position
      const positions = calculateSectionPositions();
      const viewportCenter = currentY + window.innerHeight / 2;
      
      const currentSection = positions.find(section => 
        viewportCenter >= section.top && viewportCenter < section.bottom
      );
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
      
      // Set scrolling state
      if (!isScrolling) {
        setIsScrolling(true);
      }
      
      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };
    
    // Hide scrollbars but keep functionality
    const style = document.createElement('style');
    style.textContent = `
      /* Hide scrollbar for Chrome, Safari and Opera */
      body::-webkit-scrollbar {
        display: none;
      }
      
      /* Hide scrollbar for IE, Edge and Firefox */
      body {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }

      html::-webkit-scrollbar {
        display: none;
      }
      
      /* Fixed sections without flickering transitions */
      .section-container {
        height: 100vh;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (style && style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, [isScrolling]);
  
  // Handle navigation dot click with optimized scrolling
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    
    if (section) {
      isManualScrolling.current = true;
      
      // Calculate proper offset based on fixed elements
      const yOffset = 0; // No offset to prevent misalignment
      const y = section.offsetTop;
      
      // Scroll to section with proper offset
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
      
      // Set active section
      setActiveSection(parseInt(sectionId.replace('section', '')));
      
      // Reset manual scrolling flag after animation completes
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 800);
    }
  };
  
  // Simple section component without transitions that cause flickering
  const Section = ({ children, id, index }) => {
    return (
      <div 
        id={id}
        className="section-container flex items-center justify-center"
      >
        {children}
      </div>
    );
  };
  
  return (
    
    <div className='bg-black h-screen'>
      <Navbar/>
      {/* Custom scroll progress bar */}
      <div className='fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-50'style={{ 
          width: `${Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
        }}
      />
      
      <HeroSection/>
      
      {/* Scroll indicator for new visitors */}
      <div 
        className='fixed bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center z-20 
          animate-bounce'
        style={{ 
          opacity: scrollY < 100 ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
          pointerEvents: scrollY < 100 ? 'auto' : 'none'
        }}
      >
        <p className='text-white/80 text-sm mb-2'>Scroll Down</p>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-cyan-400"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
      
      {/* Custom navigation dots - fixed on the right side */}
      <div className=' fixed right-5 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col space-y-4 z-20'>
        {[1, 2, 3, 4].map((section) => (
          <a
            key={section}
            href={`#section${section}`}
            onClick={(e) => handleNavClick(e, `section${section}`)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ease-out
              ${activeSection === section ? 'bg-cyan-400' : 'bg-gray-500/50 hover:bg-teal-500/50'}`}
            aria-label={`Navigate to section ${section}`}
            style={{
              transform: activeSection === section ? 'scale(1.25)' : 'scale(1)',
              transition: 'background-color 0.3s ease-out, transform 0.3s ease-out'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;