import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = ({ mentorId, menteeId }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch summary from backend
  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/summary/generate`,
        {
          params: { mentorId, menteeId },
        }
      );
  
      console.log("📢 Full API Response from Gemini:", response.data);
  
      // Extract summary from Gemini response
      const extractedSummary = 
      response.data?.summary?.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Summary not available.";
        console.log(JSON.stringify(response, null, 2));
  
      setSummary(extractedSummary);
    } catch (error) {
      console.error("❌ Error fetching summary:", error);
      setError("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  // Function to download chat history as a text file
  const downloadChat = () => {
    if (!summary) return;

    const chatContent = `Post-Consultation Summary:\n\n${summary}`;
    const blob = new Blob([chatContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `chat_summary_${mentorId}_${menteeId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-cyan-400 text-center mb-4">
          Post-Consultation Summary
        </h2>

        {/* Generate Summary Button */}
        <button
          onClick={fetchSummary}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2 rounded-md transition duration-300"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>

        {/* Display Summary */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {summary && (
          <div className="mt-6 p-4 bg-gray-800 rounded-md border border-gray-700">
            <h3 className="text-lg font-semibold text-cyan-400">Summary Report:</h3>
            <p className="mt-2 text-gray-300 whitespace-pre-wrap">{summary}</p>

            {/* Download Button */}
            <button
              onClick={downloadChat}
              className="mt-4 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 w-full rounded-md transition duration-300"
            >
              Download Chat Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
