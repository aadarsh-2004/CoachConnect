import { Phone, MessageCircle, BadgeCheck, Video } from "lucide-react";

const ExpertCard = ({ expert }) => {
  return (
    <div className="relative rounded-2xl p-4 border-none shadow-xl  bg-black/35 backdrop-blur-2xl max-w-sm w-full mx-auto">
      {/* Decorative Circles */}
      <div className="absolute bottom-[-10px] md:bottom-[10px] right-[5%] md:right-[5%] w-16 md:w-32 h-16 md:h-24 rounded-full bg-gradient-to-r from-cyan-800/10 to-cyan-800/20 blur-xl"></div>
      <div className="absolute top-[10%] md:top-[15%] right-[10%] md:right-[20%] w-12 md:w-16 h-12 md:h-16 rounded-full bg-gradient-to-r from-cyan-400/30 to-cyan-800/20 blur-lg"></div>
      
      {/* Verified Badge */}
      <div className="flex items-start justify-start gap-2 mb-3">
        <span className="text-sm text-gray-300 flex items-center gap-1 bg-gray-800 p-1 pr-2 rounded-md">
          <BadgeCheck className="w-4 h-4 rounded-full bg-teal-500 text-black" />
          Verified
        </span>
      </div>

      {/* Expert Info Header */}
      <div className="flex justify-start mb-4 space-x-3">
        <div className="flex-col gap-3 px-1 justify-center items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={expert.image}
              alt={expert.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-teal-500 rounded-full border-2 border-[#1A1A1A]" />
          </div>
          
          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mb-0">
            <div className="flex items-center justify-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-white font-normal text-[12px]">{expert.rating}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold flex items-center gap-1">
            {expert.name}
            <span className="text-teal-500">✓</span>
          </h3>
          <p className="text-gray-400 font-poppins text-xs line-clamp-1">{expert.title}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-2 line-clamp-2">
        {expert.description}
      </p>

      {/* Company & Location */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
        <span>{expert.company}</span>
        <span>{expert.location}</span>
      </div>

      {/* Contact Options */}
      <div className="flex  justify-between items-center gap-2 mb-4">
        <div className="flex  flex-wrap-reverse gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 bg-[#2A2A2A] text-white px-4 py-2 rounded-lg w-full sm:w-auto">
            <MessageCircle className="w-5 h-5 text-yellow-400" />₹{expert.messageRate}
          </button>
          <button className="flex items-center gap-2 bg-[#2A2A2A] text-white px-4 py-2 rounded-lg w-full sm:w-auto">
            <Video className="w-5 h-5 text-cyan-400" />₹{expert.videoRate}
          </button>
          <button className="flex items-center gap-2 bg-[#2A2A2A] text-white px-4 py-2 rounded-lg w-full sm:w-auto">
            <Phone className="w-5 h-5 text-green-400" />₹{expert.callRate}
          </button>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {expert.skills.map((skill, index) => (
          <span
            key={index}
            className="text-xs text-white bg-[#2A2A2A] px-3 py-1 rounded-lg"
          >
            {skill}
          </span>
        ))}
        {expert.moreSkills > 0 && (
          <span className="text-xs text-gray-400">
            +{expert.moreSkills} more
          </span>
        )}
      </div>
    </div>
  );
};

export default ExpertCard;
