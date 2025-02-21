import { useState, useEffect } from "react";
import {
  Search,
  Wallet,
  Bell,
  MessageSquare,
  MessageSquareText,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const phrases = [
    "How to start freelancing?",
    "Find remote work...",
    "Connect with clients...",
    "Discover opportunities...",
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  // Auto-typing effect for search placeholder
  useEffect(() => {
    let timeout;

    if (isTyping) {
      const currentPhrase = phrases[currentPhraseIndex];
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 25);
      } else {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentPhraseIndex]);

  return (
    <nav className="w-full fixed z-50 bg-[#0D0D0D] border-none py-4 border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between  md:justify-evenly">
          {/* Logo */}
          <div className="flex items-center justify-between gap-12 md:mr-0 w-[150px]  ">
            <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-white ">
              Mentor
              <span className="text-cyan-400 inline-block group-hover:rotate-12 transition-transform duration-300">
                .ai
              </span>
            </h3>
          </div>

          {/* FindPeopleDropDown */}
          <button className="text-gray-300   hover:text-white px-0 py-0 text-sm font-medium hidden md:flex items-center justify-center ">
            Find people
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Mobile View: Search Bar, Bell, and Wallet */}
          <div className="md:hidden flex items-center justify-between space-x-2">
            {/* Search Icon */}
            {/* <div className=" md:w-full flex items-center bg-[#1A1A1A] rounded-full border border-gray-700">
                <div className="flex items-center pl-4">

                  <div className="bg-[#2A2A2A] p-1 rounded-full">
                    <Search className="text-teal-500 w-4 h-4" />
                  </div>

                </div>
                <input
                  type="text"
                  placeholder={displayText}
                  className=" w-1/2 md:w-full bg-transparent text-white pl-3 pr-4 py-2 text-sm focus:outline-none"
                />
              </div> */}

            {/* Bell Icon */}
            <button className=" p-2 text-gray-300 hover:text-white">
              <Bell className="w-5 h-5" />
            </button>
            {/* Wallet Icon */}
            <Link to="/wallet">
              <div className="flex items-center space-x-2 ml-4 rounded-full bg-[#1c2b2a] px-4 py-2">
                <Wallet className="text-yellow-500" />
                {/* <span className="text-white">₹0.00</span> */}
            </div>
            </Link>
          </div>

          {/* Desktop View: Search Bar, Notification, Wallet and Profile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              {/* Search */}
              <div className="flex items-center bg-[#1A1A1A] rounded-full border border-gray-700">
                <div className="flex items-center pl-4">
                  <div class="relative flex justify-center items-center w-[28px] h-[28px] bg-[#000000] rounded-full flex-shrink-0">
                    <img
                      src="https://application-assets-app-and-web.s3.ap-south-1.amazonaws.com/gif-circle.gif"
                      alt="circle"
                      class="w-[28px] h-[28px] absolute top-0 left-0"
                    />
                    <Search className="text-white/60 w-3 h-3 " />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder={displayText}
                  className="w-full bg-transparent text-white pl-3 pr-4 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* RightSideOfNavbar (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-white">
              <MessageSquareText className="w-5 h-5" />
            </button>
            {/* Notification Icon */}
            <button className="p-2 text-gray-300 hover:text-white">
              <Bell className="w-5 h-5" />
            </button>
            {/* Wallet Icon */}
            <Link to="/wallet">
            <button className="flex items-center space-x-3 ml-4 gap-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center gap-4 rounded-full font-semibold bg-[#1c2b2a] px-5 py-2 border border-gray-700">
                  <Wallet className="text-yellow-500" />
                  <div>
                    <span className="text-white">₹</span>
                    <span className="text-white ml-1">0.00</span>
                  </div>
                </div>
              </div>
            </button>
              </Link>
              
              {/* Profile Icon */}
              <Link to="/profile">
              <button className="flex justify-center items-center gap-1 ">
                <div className=" bg-cyan-400 rounded-3xl w-12 h-12 p-3 text-center">
                  <span className="text-black font-bold">AS</span>
                </div>
                <svg
                  className="w-4 h-4 ml-1 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
