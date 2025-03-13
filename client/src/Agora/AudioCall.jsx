import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Button, Container, Typography, Paper, Box } from "@mui/material";

// Agora Configuration
const appId = "9fa986b2eeeb41f9a9f7512e506a51ec";
const channel = "mentoraicall";
const token = "007eJxTYPBqubEv2uCbWUdH5q/3B351a/M+XOpZwerVvLnraomLQpICg2VaoqWFWZJRampqkolhmmWiZZq5qaFRqqmBWaKpYWqyeNyF9IZARoaJhluYGRkgEMTnYchNzSvJL0rMTE7MyWFgAADBsCOi";
const uid = 0; // Auto-generated UID

const VoiceCall = () => {
  const [client, setClient] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState([]);

  useEffect(() => {
    const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setClient(agoraClient);
    setupEventListeners(agoraClient);

    return () => {
      if (isJoined) leaveChannel();
    };
  }, []);

  // Handle remote users
  const setupEventListeners = (agoraClient) => {
    agoraClient.on("user-published", async (user, mediaType) => {
      await agoraClient.subscribe(user, mediaType);
      console.log("Subscribed to:", user.uid);

      if (mediaType === "audio") {
        user.audioTrack.play();
      }
      setRemoteUsers((prev) => [...prev, user]);
    });

    agoraClient.on("user-unpublished", (user) => {
      console.log("User left:", user.uid);
      setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
    });
  };

  // Join the Agora channel
  const joinChannel = async () => {
    if (!client) return;
    await client.join(appId, channel, token, uid);

    const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await client.publish([audioTrack]);
    setLocalAudioTrack(audioTrack);
    setIsJoined(true);

    console.log("Joined and Published Audio!");
  };

  // Toggle Mute / Unmute
  const toggleMute = () => {
    if (localAudioTrack) {
      localAudioTrack.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  // Leave the channel
  const leaveChannel = async () => {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    await client.leave();
    setIsJoined(false);
    setRemoteUsers([]);
    console.log("Left the channel");
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          🎙 Agora Voice Call
        </Typography>

        {!isJoined ? (
          <Button variant="contained" color="primary" onClick={joinChannel} sx={{ mt: 2 }}>
            Join Call
          </Button>
        ) : (
          <>
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" color={isMuted ? "secondary" : "success"} onClick={toggleMute} sx={{ mr: 2 }}>
                {isMuted ? "Unmute" : "Mute"}
              </Button>
              <Button variant="contained" color="error" onClick={leaveChannel}>
                Leave Call
              </Button>
            </Box>

            <Typography variant="h6" sx={{ mt: 4 }}>
              👤 Remote Users: {remoteUsers.length}
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default VoiceCall;
