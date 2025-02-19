import { useState,useEffect } from "react";
import { Search, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isOpen) setIsOpen(false);
  };

//   Placehodler texts in searchbar
  const phrases = [
    "How to raise funds?",
    "Find a startup mentor...",
    "Learn about pitching...",
    "Business plan templates..."
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

//   SearchBar Auto Text Change
  useEffect(() => {
    let timeout;
    
    if (isTyping) {
      const currentPhrase = phrases[currentPhraseIndex];
      if (displayText.length < currentPhrase.length) {
        // Typing effect
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 50);
      } else {
        // Pause at the end of typing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      }
    } else {
      // Erasing effect
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 25);
      } else {
        // Move to next phrase
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentPhraseIndex]);

  

  
  return (
    <nav className="w-full fixed z-50  font-poppins font-semibold py-4 bg-transparent backdrop-blur-3xl shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <div className="relative group">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Mentor
              <span className="text-cyan-400 inline-block group-hover:rotate-12 transition-transform duration-300">
                .ai
              </span>
            </h3>
          </div>

        
            {/* SearchBar */}
            <div className="hidden md:flex bg-white items-center justify-center gap-1 p-1 rounded-3xl">
              <Search className="text-gray-700 ml-3" size={20} />
              <input
                type="text"
                placeholder={displayText}
                className="flex-1 bg-transparent outline-none px-16 text-cyan-400 text-[14px] placeholder-gray-500"
              />
              <button className="bg-black text-cyan-400 px-4 py-2 font-medium rounded-full hover:bg-cyan-700 ">
                Search
              </button>
            </div>

            <div className="hidden md:flex justify-center items-center gap-12 font-roboto font-normal ">

                <button className="text-white bg-transparent px-4 py-2 rounded-lg border-b-2 hover:border-1 hover:border-cyan-500">
                For Experts
                </button>

                <button className="text-white bg-transparent px-4 py-2 rounded-lg border-b-2  hover:border-1  hover:border-cyan-500">
                Blogs
                </button>
                <Link to="/signin">
                <button className="flex items-center gap-2 bg-white text-black font-medium px-4 py-2 rounded-xl hover:bg-cyan-400 ">
                <User className="text-black w-6 h-6 p-1 bg-white rounded-xl" />
                Login
                </button>
                </Link>

            </div>


          

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={toggleSearch}
              className="p-2 text-white hover:bg-cyan-600/10 rounded-lg"
            >
              <Search size={24} />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:bg-cyan-600/10 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden mt-4 px-2">
            <div className="flex bg-white items-center justify-center gap-1 p-1 rounded-3xl">
              <Search className="text-cyan-600 ml-3" size={20} />
              <input
                type="text"
                placeholder="How to raise funds?"
                className="flex-1 bg-transparent outline-none px-4 text-cyan-700 text-[14px] placeholder-cyan-600"
              />
              <button className="bg-cyan-600 text-white px-4 py-2 rounded-full hover:bg-cyan-700 ">
                Search
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <div className="flex flex-col gap-2">
              <button className="text-white text-left px-4 py-2 rounded-lg hover:bg-cyan-600/10">
                For Experts
              </button>
              <button className="text-white text-left px-4 py-2 rounded-lg hover:bg-cyan-600/10">
                Blogs
              </button>

              <Link to="/signin" >
                <button  className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 ">
                  <User className="text-cyan-600 w-6 h-6 bg-white rounded-xl" />
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;