import { useEffect, useState, useRef } from "react";
import AC from "agora-chat";
import axios from "axios";

const appKey = "611312830#1513300"; // Your Agora App Key

const Chat = () => {
  const [userId, setUserId] = useState("");
  const [peerId, setPeerId] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const chatClient = useRef(null);

  useEffect(() => {
    if (userId && token) {
      chatClient.current = new AC.connection({ appKey });

      chatClient.current.addEventHandler("connection&message", {
        onConnected: () => addLog(`✅ Connected as ${userId}`),
        onDisconnected: () => addLog("❌ Disconnected from Agora Chat"),
        onTextMessage: async (msg) => {
          addLog(`${msg.from}: ${msg.msg}`);

          try {
            await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/api/chat/save`,
              {
                senderId: msg.from,
                receiverId: userId,
                message: msg.msg,
                messageType: "text",
              }
            );
          } catch (error) {
            console.error("Error saving message:", error);
          }
        },
      });

      chatClient.current
        .open({ user: userId, accessToken: token })
        .then(() => {
          addLog("🔓 Agora Connection Opened");
          setIsLoggedIn(true);
        })
        .catch((error) => console.error("Agora Open Error:", error));

      return () => chatClient.current.close();
    }
  }, [userId, token]);

  const handleSendMessage = async () => {
    if (message.trim() && peerId.trim()) {
      const msg = AC.message.create({
        chatType: "singleChat",
        type: "txt",
        to: peerId,
        msg: message,
      });

      await chatClient.current.send(msg);
      addLog(`Sent to ${peerId}: ${message}`);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/chat/save`, {
        senderId: userId,
        receiverId: peerId,
        message,
        messageType: "text",
      });

      setMessage("");
    }
  };

  const handleLogin = () => {
    if (userId && token) {
      setIsLoggedIn(true);
    }
  };

  const handleEndSession = () => {
    setIsLoggedIn(false);
    chatClient.current.close();
    setLogs([]);
  };

  const addLog = (log) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-black overflow-hidden">
      <div className='absolute top-[10px] left-[-5%] w-72 h-72 rounded-full bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 blur-2xl z-0'></div>
      <div className='absolute bottom-[120px] right-[1%] w-56 h-56 rounded-full bg-gradient-to-r from-cyan-600/20 to-purple-800/20 blur-xl z-0'></div>
      <div className='absolute top-[5%] right-[35%] w-32 h-32  rounded-full bg-gradient-to-r from-purple-900/20 to-cyan-400/20 blur-lg z-0'></div>
      

      <div className="relative z-10 w-[90%] max-w-6xl bg-gray-900 bg-opacity-40 p-6 rounded-xl shadow-2xl border border-gray-800 text-white flex justify-around ">
        {/* Left Panel - Login & User Input */}
        <div className="w-1/4 border-r border-gray-900 p-4">
          <h2 className="text-2xl font-bold text-cyan-400 text-center">Live Chat Session</h2>

          {!isLoggedIn ? (
            <>
              {/* User ID Input */}
              <div className="mt-4">
                <label className="block text-gray-300">User ID:</label>
                <input
                  type="text"
                  className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-cyan-400"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your User ID"
                />
              </div>

              {/* Token Input */}
              <div className="mt-4">
                <label className="block text-gray-300">Token:</label>
                <input
                  type="text"
                  className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-cyan-400"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter your Token"
                />
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2 rounded-md transition duration-300"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium text-cyan-400 text-center mt-4">Welcome, {userId}</h3>

              {/* End Chat Button */}
              <button
                onClick={handleEndSession}
                className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition duration-300"
              >
                End Chat
              </button>
            </>
          )}
        </div>

        {/* Right Panel - Chat Messages */}
        <div className="w-[700px] p-4 flex flex-col">
          <div className="flex-grow overflow-y-auto h-80 p-2 border border-gray-700 rounded-md bg-black text-md">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-md max-w-xs ${
                  log.startsWith("Sent to") ? "bg-cyan-500 text-black ml-auto text-right" : "bg-gray-700 text-white"
                }`}
              >
                {log}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="mt-4">
            <label className="block text-gray-300">Peer User ID:</label>
            <input
              type="text"
              className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-cyan-400"
              value={peerId}
              onChange={(e) => setPeerId(e.target.value)}
              placeholder="Enter peer User ID"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-300">Message:</label>
            <div className="flex">
              <input
                type="text"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-cyan-400"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-4 py-2 rounded-md transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
