import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategorySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  const categories = [
    {
      title: "Entrepreneurs & Fund raising",
      color: "bg-[#1665c0]",
      image:
        "https://cfront-unikon-assets.unikon.ai/extra_asset_19358_5ac9a98c-36c6-4c52-bd26-a75cdbb0f98f.png",
      description: "Founders connect | VCs/Angel Investors | Founding team",
    },
    {
      title: "Interview Preparation",
      color: "bg-[#37acbc]",
      image:
        "https://cfront-unikon-assets.unikon.ai/extra_asset_34984_e88f0df0-8c5c-45a5-bc10-3f9d05fd2d8d.png",
      description: "Mock Interviews | CV Review | Body Language",
    },
    {
      title: "Working Professionals",
      color: "bg-[#eb6697]",
      image:
        "http://cfront-unikon-assets.unikon.ai/extra_asset_34984_e88f0df0-8c5c-45a5-bc10-3f9d05fd2d8d.png",
      description: "Marketing | Senior management | Tech experts | E commerce",
    },
    {
      title: "Relationship & Loneliness",
      color: "bg-[#fc8543]",
      image:
        "https://cfront-unikon-assets.unikon.ai/extra_asset_19368_59d475d3-ee9a-4ce7-b319-88bd1a42961e.png",
      description: "Dating advice | Emotional support | Moving on | Breakup",
    },
    {
      title: "Astrology & More",
      color: "bg-[#30302b]",
      image:
        "https://cfront-unikon-assets.unikon.ai/extra_asset_19370_61290102-0201-4187-9747-296c2f211572.png",
      description: "Vedic Astrology/Vaastu | Tarrot card | Numerology | Kundli",
    },

    {
      title: "Entrepreneurs & Fund raising",
      color: "bg-[#50c77d]",
      image:
        "https://cfront-unikon-assets.unikon.ai/extra_asset_19358_5ac9a98c-36c6-4c52-bd26-a75cdbb0f98f.png",
      description: "Founders connect | VCs/Angel Investors | Founding team",
    },
    {
      title: "Interview Preparation",
      color: "bg-[#374aca]",
      image:
        "https://cfront-unikon-assets.unikon.ai/extra_asset_34984_e88f0df0-8c5c-45a5-bc10-3f9d05fd2d8d.png",
      description: "Mock Interviews | CV Review | Body Language",
    },
    {
      title: "Working Professionals",
      color: "bg-[#7C90D8]",
      image:
        "http://cfront-unikon-assets.unikon.ai/extra_asset_34984_e88f0df0-8c5c-45a5-bc10-3f9d05fd2d8d.png",
      description: "Marketing | Senior management | Tech experts | E commerce",
    },
    {
      title: "Relationship & Loneliness",
      color: "bg-[#D87C9D]",
      image:
        "https://cfront-unikon-assets.unikon.ai/extra_asset_19368_59d475d3-ee9a-4ce7-b319-88bd1a42961e.png",
      description: "Dating advice | Emotional support | Moving on | Breakup",
    },
    {
      title: "Astrology & More",
      color: "bg-[#B5AB8F]",
      image:
        "https://cfront-unikon-assets.unikon.ai/extra_asset_19370_61290102-0201-4187-9747-296c2f211572.png",
      description: "Vedic Astrology/Vaastu | Tarrot card | Numerology | Kundli",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const autoPlay = () => {
      if (sliderRef.current) {
        const maxScroll =
          sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        const currentScroll = sliderRef.current.scrollLeft;

        if (currentScroll >= maxScroll) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }
    };

    autoPlayRef.current = setInterval(autoPlay, 3000); // Change slide every 3 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleDotClick = (index) => {
    if (sliderRef.current) {
      const scrollAmount = index * 280;
      sliderRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
      setCurrentSlide(index);
    }
  };

  return (
    <div className="max-w-full px-4 py-8 bg-black mb-24 mt-24 md:mt-4">
      {/* Heading Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          Find <span className="text-cyan-400">Mentor </span> by category
        </h2>
        <p className="text-white/70 text-center mt-2">
          Connect with specialists in various fields to help you grow
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Desktop Slider View */}
        <div className="hidden md:block">
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll gap-0 pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, index) => (
              <div key={index} className="flex-none w-64 snap-start">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>

        
        </div>

        {/* Mobile Grid View */}
        <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.slice(0, 6).map((category, index) => (
            <CategoryCard key={index} category={category} isMobile={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Separate CategoryCard component for reusability
const CategoryCard = ({ category, isMobile }) => (
  <div
    className={`${category.color} rounded-2xl py-4 ${
      isMobile ? "w-full" : "w-[200px]"
    } h-38 flex flex-col items-center transition-transform hover:scale-105`}
  >
    <h3 className="text-white max-w-[128px] text-center font-poppins text-[16px] mb-1">
      {category.title}
    </h3>
    <div className="flex-1 flex items-center mb-0 justify-center">
      <img
        src={category.image}
        alt={category.title}
        className="w-[80px] h-[80px] object-cover"
      />
    </div>
    <p className="text-white/90 text-[12px] max-w-[180px] font-roboto mt-0 text-center">
      {category.description}
    </p>
  </div>
);

export default CategorySlider;
