"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./exercise.scss";
import styles1 from "../globals.scss";
import Quests from "../quest/page";
import io from "socket.io-client";
import { set } from "firebase/database";

const trigger_points = [
  "squat_down",
  "jumping_jack_up",
  "curl_up",
  "lunge_down",
  "high_knee_up",
  "push_up_down",
  "back_row_up",
];

export default function Exercise() {
  const videoRef = useRef(null);
  const socket = useRef(null);
  const intervalRef = useRef(null); // To hold the reference to the interval
  const [isClient, setIsClient] = useState(false);
  const [receivedLabel, setReceivedLabel] = useState(null);
  const [previousLabel, setPreviousLabel] = useState(null);

  useEffect(() => {
    setIsClient(true);

    // Initialize Socket.IO connection
    socket.current = io("http://localhost:8000");

    socket.current.on("connect", () => {
      console.log("Socket.IO connected");
      // Once connected, start sending video frames at intervals
      startSendingVideo();
    });
    // startSendingVideo();

    // Request access to video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error(err));
    }

    // Cleanup on component unmount
    return () => {
      if (socket.current) socket.current.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isClient) {
      startSendingVideo();
    }
  }, [isClient]); // Only run this effect when `isClient` changes

  const captureAndSendFrame = () => {
    if (videoRef.current && socket.current.connected) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          if (!blob) {
            console.error("Blob is null or undefined.");
            return;
          }
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            // console.log(reader.result);
            socket.current.emit("receive_image", {
              user_email: process.env.NEXT_PUBLIC_DEMO_EMAIL,
              image: reader.result,
            });
          };
          socket.current.on("label", (label) => {
            // check if label in trigger points
            if (receivedLabel != previousLabel && trigger_points.includes(label)) {
              console.log("Received label:", label);
              setPreviousLabel(receivedLabel);
              setReceivedLabel(label); // Update state with the received label
            }

            // console.log("Received label:", label);
            // setReceivedLabel(label); // Update state with the received label
          });
        },
        "image/jpeg",
        0.95
      ); // Adjust quality as needed
    }
  };

  const startSendingVideo = () => {
    // Clear any existing interval to avoid multiple intervals running
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Set up an interval to capture and send frames every 0.1 seconds
    intervalRef.current = setInterval(() => {
      captureAndSendFrame();
    }, 1000); // ms
    // captureAndSendFrame();
  };

  // return <video ref={videoRef} autoPlay playsInline muted></video>;
  return (
    <main>
      <div className="container">
        <div className="video__container">
          <video
            className="video"
            ref={videoRef}
            autoPlay
            playsInline
            muted
          ></video>
        </div>
        <Quests />
      </div>
    </main>
  );
}
