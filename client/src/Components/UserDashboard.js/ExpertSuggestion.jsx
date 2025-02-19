import { useEffect, useState } from 'react';  // Importing React hooks
import { Filter, Check, Clock, Star, SortDesc } from 'lucide-react';
import ExpertCard from './ExpertCard';

const ExpertSuggestion = () => {
  // Step 1: Create state for experts data
  const [experts, setExperts] = useState([]);

  // Step 2: Fetch data from API (or use dummy data initially)
  useEffect(() => {
    const fetchExperts = async () => {
      // In the future, replace this with an actual API call
      const data = [
        {
          name: "Rushi Ahuja",
          title: "CEO at Unshaadi",
          image: "https://unikon.ai/_next/image?url=https%3A%2F%2Fcfront-unikon-assets.unikon.ai%2Fextra_asset_67937_21e4d39d-02f4-4941-a7c1-dea3ef405b9e.jpg&w=128&q=75",
          callRate: 250,
          messageRate: 500,
          videoRate: 199,
          description: "I can mentor with assessing the health and roadmap of your startup. It takes a village to grow a child...",
          company: "Unshaadi",
          location: "Gurgaon",
          rating: 5,
          skills: ["Mentoring", "Life Counseling", "Entrepreneurship", "Startup Mentoring"],
          moreSkills: 3
        },
        {
            name: "Siddharth Menaria",
            title: "CEO at MarketKing",
            image: "https://media.licdn.com/dms/image/v2/D4D03AQEX-nkbu27CPQ/profile-displayphoto-shrink_400_400/B4DZRl0V0THEAg-/0/1736875009777?e=1745452800&v=beta&t=OEhK-RwGVXO2i2h7mM0McEYzHjVdhPqOhRteNqCQA7o",
            callRate: 250,
            messageRate: 500,
            videoRate: 199,
            description: "I can mentor with assessing the health and roadmap of your startup. It takes a village to grow a child...",
            company: "Unshaadi",
            location: "Gurgaon",
            rating: 5,
            skills: ["Mentoring", "Life Counseling", "Entrepreneurship", "Startup Mentoring"],
            moreSkills: 3
          },
          {
            name: "Nakul Pandya",
            title: "Founder of Lakecity.Tales",
            image: "https://media.licdn.com/dms/image/v2/D4D03AQEKtLOBxXlypQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715878987332?e=1745452800&v=beta&t=sclnwBOwaLxfpOOZZlbKOXUhVAgKzn2RGAQ0_rVyBvs",
            callRate: 250,
            messageRate: 500,
            videoRate: 199,
            description: "I can mentor with assessing the health and roadmap of your startup. It takes a village to grow a child...",
            company: "Unshaadi",
            location: "Gurgaon",
            rating: 5,
            skills: ["Mentoring", "Life Counseling", "Entrepreneurship", "Startup Mentoring"],
            moreSkills: 3
          },
          {
            name: "Talent Jain",
            title: "Market strategist [CFA 3]",
            image: "",
            callRate: 250,
            messageRate: 500,
            videoRate: 199,
            description: "I can mentor with assessing the health and roadmap of your startup. It takes a village to grow a child...",
            company: "Unshaadi",
            location: "Gurgaon",
            rating: 5,
            skills: ["Mentoring", "Life Counseling", "Entrepreneurship", "Startup Mentoring"],
            moreSkills: 3
          },
          {
            name: "Ushit Sharma",
            title: "Chairman Of SabKhelo.com",
            image: "https://media.licdn.com/dms/image/v2/D4D35AQGUc4XrHSV9Bg/profile-framedphoto-shrink_100_100/B4DZT1o6T1GkAk-/0/1739287930392?e=1740546000&v=beta&t=yebriG10MoTy-LlVcBfNFQgjID1j52PXK-EwaAy3Bt4",
            callRate: 250,
            messageRate: 500,
            videoRate: 199,
            description: "I can mentor with assessing the health and roadmap of your startup. It takes a village to grow a child...",
            company: "Unshaadi",
            location: "Gurgaon",
            rating: 5,
            skills: ["Mentoring", "Life Counseling", "Entrepreneurship", "Startup Mentoring"],
            moreSkills: 3
          },
          {
            name: "Vinita Menaria",
            title: "President of M Association",
            image: "https://instagram.fudr1-1.fna.fbcdn.net/v/t51.2885…UDFXHFEAhLeUwjqlCxaeEw&oe=67BB18AB&_nc_sid=7d3ac5",
            callRate: 250,
            messageRate: 500,
            videoRate: 199,
            description: "I can mentor with assessing the health and roadmap of your startup. It takes a village to grow a child...",
            company: "Unshaadi",
            location: "Gurgaon",
            rating: 5,
            skills: ["Mentoring", "Life Counseling", "Entrepreneurship", "Startup Mentoring"],
            moreSkills: 3
          },
          {
            name: "Shachi Jain",
            title: "Senior Developer At Secure Meter",
            image: "https://media.licdn.com/dms/image/v2/D4D03AQFYbBpcySj25w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1695389921135?e=1745452800&v=beta&t=Fx7D0sszGGj0VQg8K7-AH52reNW5GsVYcrY91MRMpIY",
            callRate: 250,
            messageRate: 500,
            videoRate: 199,
            description: "I can mentor with assessing the health and roadmap of your startup. It takes a village to grow a child...",
            company: "Unshaadi",
            location: "Gurgaon",
            rating: 5,
            skills: ["Mentoring", "Life Counseling", "Entrepreneurship", "Startup Mentoring"],
            moreSkills: 3
          },
          
          

        // Add more expert data here if needed
      ];
      
      setExperts(data);
    };

    fetchExperts();
  }, []);  // Empty dependency array ensures this runs once on mount

  return (
    <div className="bg-[#141414] min-h-screen p-8 ">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className='flex '>
            <div className="mb-8 ">
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Top <span className='text-cyan-400'>Mentors</span> for you</h1>
                <p className=" text-xs md:text-lg text-gray-400">
                    Connect with trusted and verified professionals across various fields of expertise
                </p>
            </div>

            {/* Filters */}
            <div className="hidden md:flex gap-2 mb-8  pl-16 items-center pb-2  px-6">
            <button className="flex items-center text-sm gap-1 bg-[#1A1A1A] text-white px-4 py-3 rounded-lg">
                <Filter className="w-4 h-4" />
                Filter
            </button>
            <button className="flex items-center text-sm gap-1 bg-[#1A1A1A] text-white px-4 py-3 rounded-lg">
                <Clock className="w-4 h-4" />
                Instantly available
            </button>
            <button className="flex items-center text-sm gap-2 bg-[#1A1A1A] text-white px-4 py-3 rounded-lg">
                <Check className="w-4 h-4" />
                Verified profiles
            </button>
            <button className="flex items-center text-sm gap-2 bg-[#1A1A1A] text-white px-4 py-3 rounded-lg">
                <Star className="w-4 h-4" />
                Top rated
            </button>
            
            </div>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert, index) => (
            <ExpertCard key={index} expert={expert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertSuggestion;
