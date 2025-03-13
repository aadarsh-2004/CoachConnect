import React, { useState } from "react";
import {
  ChevronDown,
  Upload,
  Phone,
  Mail,
  MapPin,
  Languages,
  Briefcase,
  Video,
  MessageSquare,
  PhoneCall,
  User,
  Calendar,
} from "lucide-react";

const ProfileSetup = () => {
  // Form data state
  const [formData, setFormData] = useState({
    basic: {
      firstName: "",
      lastName: "",
      designation: "",
      email: "",
      dob: "",
    },
    about: {
      experience: "",
      location: "",
      languages: "",
      description: "",
    },
    expertise: {
      areas: "",
    },
    pricing: {
      videoCall: "",
      chatPrice: "",
      audioCall: "",
    },
  });

  // UI states
  const [activeSection, setActiveSection] = useState("basic");
  const [completion, setCompletion] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFileUpload = (file, type) => {
    if (!file) return;
    // Handle file upload logic here
    console.log(`Uploading ${type}:`, file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/mentors/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.basic.email, // Identify user via email
          updatedProfile: formData, // Send updated profile data
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        throw new Error(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-full bg-transparent p-4 md:p-6 lg:p-8 font-medium">
      <div className="max-w-7xl mx-auto mt-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold font-volkhov text-white">Set up your Profile</h1>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-800 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-cyan-700 transition-colors"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-cyan-500 flex items-center justify-center text-white text-2xl mb-4">
                {formData.basic.firstName && formData.basic.lastName
                  ? `${formData.basic.firstName[0]}${formData.basic.lastName[0]}`
                  : "AS"}
              </div>
              <h2 className="text-xl text-white mb-6">
                {formData.basic.firstName
                  ? `${formData.basic.firstName} ${formData.basic.lastName}`
                  : "Your Name"}
              </h2>

              {/* Upload Buttons */}
              <div className="flex flex-wrap gap-4 mb-8 w-full justify-center">
                <label className="px-4 py-2 bg-gray-800 rounded-lg text-white flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition-colors">
                  <Upload size={16} />
                  <span>Upload image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files[0], "image")}
                  />
                </label>
                <label className="px-4 py-2 bg-gray-800 rounded-lg text-white flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition-colors">
                  <Upload size={16} />
                  <span>Upload Video</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e.target.files[0], "video")}
                  />
                </label>
              </div>

              {/* Completion Score */}
              <div className="w-full bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center text-white">
                  <div>
                    <p>Your profile completion score</p>
                    <p className="text-orange-400">9 actions pending</p>
                  </div>
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-gray-700"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${completion * 1.26} 126`}
                        className="text-yellow-400"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm text-white">
                      {completion}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 space-y-4">
            {/* Basic Info Section */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveSection(activeSection === "basic" ? "" : "basic")}
                className="w-full p-4 flex justify-between items-center text-white hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <User size={20} />
                  <span className="text-lg">Basic Info</span>
                </div>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    activeSection === "basic" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeSection === "basic" && (
                <div className="p-4 border-t border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="bg-black text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={formData.basic.firstName}
                      onChange={(e) =>
                        handleInputChange("basic", "firstName", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="bg-black text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={formData.basic.lastName}
                      onChange={(e) =>
                        handleInputChange("basic", "lastName", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Designation"
                      className="bg-black text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={formData.basic.designation}
                      onChange={(e) =>
                        handleInputChange("basic", "designation", e.target.value)
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="bg-black text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={formData.basic.email}
                      onChange={(e) =>
                        handleInputChange("basic", "email", e.target.value)
                      }
                    />
                    <input
                      type="date"
                      className="bg-black text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={formData.basic.dob}
                      onChange={(e) =>
                        handleInputChange("basic", "dob", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* About Me Section */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveSection(activeSection === "about" ? "" : "about")}
                className="w-full p-4 flex justify-between items-center text-white hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Briefcase size={20} />
                  <span className="text-lg">About Me</span>
                </div>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    activeSection === "about" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeSection === "about" && (
                <div className="p-4 border-t border-gray-700">
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="Work Experience"
                      className="bg-black text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={formData.about.experience}
                      onChange={(e) =>
                        handleInputChange("about", "experience", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      className="bg-black text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={formData.about.location}
                      onChange={(e) =>
                        handleInputChange("about", "location", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Languages"
                      className="bg-black text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={formData.about.languages}
                      onChange={(e) =>
                        handleInputChange("about", "languages", e.target.value)
                      }
                    />
                    <textarea
                      placeholder="How would you describe yourself?"
                      className="bg-black text-white p-3 rounded-lg w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={formData.about.description}
                      onChange={(e) =>
                        handleInputChange("about", "description", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Expertise Section */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveSection(activeSection === "expertise" ? "" : "expertise")}
                className="w-full p-4 flex justify-between items-center text-white hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Languages size={20} />
                  <span className="text-lg">My Expertise</span>
                </div>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    activeSection === "expertise" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeSection === "expertise" && (
                <div className="p-4 border-t border-gray-700">
                  <div className="grid grid-cols-1 gap-4">
                    <textarea
                      placeholder="Area of expertise"
                      className="bg-black text-white p-3 rounded-lg w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={formData.expertise.areas}
                      onChange={(e) =>
                        handleInputChange("expertise", "areas", e.target.value)
                      }
                    />
                    {/* <label className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition-colors">
                      <Upload size={16} />
                      <span>Attach Document/License</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files[0], "document")}
                      />
                    </label> */}
                  </div>
                </div>
              )}
            </div>

            {/* Prices Section */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveSection(activeSection === "prices" ? "" : "prices")}
                className="w-full p-4 flex justify-between items-center text-white hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Phone size={20} />
                  <span className="text-lg">My Prices</span>
                </div>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    activeSection === "prices" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeSection === "prices" && (
                <div className="p-4 border-t border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 bg-black rounded-lg p-3">
                      <Video size={20} className="text-white" />
                      <input
                        type="number"
                        placeholder="Video Call Price"
                        className="bg-transparent text-white w-full focus:outline-none focus:ring-2 focus:ring-cyan-600 rounded-sm"
                        
                      />
                    </div>

                    <div className="flex items-center gap-2 bg-black rounded-lg p-3">
                      <MessageSquare size={20} className="text-white" />
                      <input
                        type="number"
                        placeholder="Chat Price"
                        className="bg-transparent text-white w-full focus:outline-none focus:ring-2 focus:ring-cyan-600 rounded-sm"
                        
                        
                      />
                    </div>

                    <div className="flex items-center gap-2 bg-black rounded-lg p-3">
                      <PhoneCall size={20} className="text-white" />
                      <input
                        type="number"
                        placeholder="Audio Call Price"
                        className="bg-transparent text-white w-full focus:outline-none focus:ring-2 focus:ring-cyan-600 rounded-sm"
                        
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ProfileSetup;
