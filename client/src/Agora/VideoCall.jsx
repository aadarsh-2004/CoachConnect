import { useEffect, useState } from "react";
// import { createClient, createMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
const appId = "9fa986b2eeeb41f9a9f7512e506a51ec";
const channelName = "mentoraicall";
const token = "007eJxTYPBqubEv2uCbWUdH5q/3B351a/M+XOpZwerVvLnraomLQpICg2VaoqWFWZJRampqkolhmmWiZZq5qaFRqqmBWaKpYWqyeNyF9IZARoaJhluYGRkgEMTnYchNzSvJL0rMTE7MyWFgAADBsCOi";
const uid = 0; // Auto-generated UID
  
  const VideoCall = () => {
      const [client, setClient] = useState(null);
      const [localVideoTrack, setLocalVideoTrack] = useState(null);
      const [localAudioTrack, setLocalAudioTrack] = useState(null);
      const [remoteUsers, setRemoteUsers] = useState([]);
  
      useEffect(() => {
          const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
          setClient(agoraClient);
          setupEventListeners(agoraClient);
      }, []);
  
      const setupEventListeners = (agoraClient) => {
          agoraClient.on("user-published", async (user, mediaType) => {
              await agoraClient.subscribe(user, mediaType);
              console.log("User published:", user.uid);
  
              if (mediaType === "video") {
                  setRemoteUsers((prevUsers) => [...prevUsers, user]);
              }
  
              if (mediaType === "audio") {
                  user.audioTrack.play();
              }
          });
  
          agoraClient.on("user-unpublished", (user) => {
              setRemoteUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
          });
      };
  
      const joinChannel = async () => {
          if (!client) return;
          await client.join(appId, channelName, token, uid);
  
          const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
          const videoTrack = await AgoraRTC.createCameraVideoTrack();
  
          setLocalAudioTrack(audioTrack);
          setLocalVideoTrack(videoTrack);
  
          await client.publish([audioTrack, videoTrack]);
          console.log("Joined & published successfully!");
      };
  
      const leaveChannel = async () => {
          if (!client) return;
  
          localAudioTrack && localAudioTrack.close();
          localVideoTrack && localVideoTrack.close();
  
          setLocalAudioTrack(null);
          setLocalVideoTrack(null);
          setRemoteUsers([]);
  
          await client.leave();
          console.log("Left the channel!");
      };
  
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
              <h1 className="text-3xl font-bold mb-6">Agora Video Call</h1>
  
              <div className="flex space-x-4 mb-4">
                  <button
                      onClick={joinChannel}
                      className="bg-green-500 px-6 py-2 rounded-md hover:bg-green-600 transition"
                  >
                      Join Call
                  </button>
                  <button
                      onClick={leaveChannel}
                      className="bg-red-500 px-6 py-2 rounded-md hover:bg-red-600 transition"
                  >
                      Leave Call
                  </button>
              </div>
  
              <div className="grid grid-cols-2 gap-4">
                  {/* Local Video */}
                  {localVideoTrack && (
                      <div className="relative w-80 h-60 bg-gray-700 flex items-center justify-center">
                          <div className="absolute top-2 left-2 text-xs bg-black px-2 py-1 rounded">
                              You
                          </div>
                          <video
                              ref={(el) => el && localVideoTrack.play(el)}
                              className="w-full h-full"
                          ></video>
                      </div>
                  )}
  
                  {/* Remote Users */}
                  {remoteUsers.map((user) => (
                      <div key={user.uid} className="relative w-80 h-60 bg-gray-700 flex items-center justify-center">
                          <div className="absolute top-2 left-2 text-xs bg-black px-2 py-1 rounded">
                              User {user.uid}
                          </div>
                          <video
                              ref={(el) => el && user.videoTrack.play(el)}
                              className="w-full h-full"
                          ></video>
                      </div>
                  ))}
              </div>
          </div>
      );
  };
  
  export default VideoCall;
  