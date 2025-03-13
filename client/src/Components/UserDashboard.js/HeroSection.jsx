import { Search } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phrases = [
    "startup journey",
    "business growth",
    "funding goals",
    "product development",
    "market strategy",
  ];

  useEffect(() => {
    let timeout;

    if (isTyping) {
      const currentPhrase = phrases[currentPhraseIndex];
      if (displayText.length < currentPhrase.length) {
        // Typing effect
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 100); // Typing speed
      } else {
        // Pause at the end of typing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Wait time at the end
      }
    } else {
      // Erasing effect
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 35); // Erasing speed
      } else {
        // Move to next phrase
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentPhraseIndex]);

  return (
    <div
      className="relative md:relative h-[220px] top-24 md:top-0  md:h-[550px] md:flex md:flex-col md:items-center md:justify-center text-white px-4"
      style={{
        backgroundImage:
          "url('https://application-assets-app-and-web.s3.ap-south-1.amazonaws.com/Mask+group+(2).svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/80 via-transparent to-[#148f81]/30" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center md:space-y-6  ">
        <h1 className="text-2xl md:text-5xl font-bold leading-tight">
          Find the best expert to help you with
          <div className="h-20 md:h-20">
            {" "}
            {/* Fixed height container for smooth transitions */}
            <span className="block text-[#ffba44] mt-2 min-h-[1.2em] transition-all duration-200">
              {displayText}
            </span>
          </div>
        </h1>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto md:mt-8 ">
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-2">
            <div class="relative flex justify-center items-center w-[28px] h-[28px] bg-[#000000] rounded-full flex-shrink-0">
              <a href="https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/08/08/20250308083623-YPVUYM7S.json">
              <img
                src="https://application-assets-app-and-web.s3.ap-south-1.amazonaws.com/gif-circle.gif"
                alt="circle"
                class="w-[28px] h-[28px] absolute top-0 left-0"
              />
              </a>
              <Search className="text-white/60 w-3 h-3 " />
            </div>

            <input
              type="text"
              placeholder="Search by name, company, skills, and more..."
              className="w-full bg-transparent placeholder:text-white text-white px-4 py-2 outline-none placeholder-white/60"
            />
            <button className="bg-cyan-400 font-medium hover[#148f81] text-black px-6 py-2 rounded-xl transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 hidden md:flex md:flex-row justify-between items-center text-white/80 text-sm md:text-base">
          <p>
            Need help finding the best expert for your query? Give us a call and
            we will match you with the right person!
          </p>
          <p className="mt-2 md:mt-0">
            Contact us at: <span className="font-semibold">+917877571101</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
