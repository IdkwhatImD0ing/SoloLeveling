"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./exercise.scss";
import styles1 from "../globals.scss";
import Quests from "../quest/page";
import io from "socket.io-client";
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useFirestore } from "reactfire";

export default function Exercise() {
  const videoRef = useRef(null);
  const socket = useRef(null);
  const intervalRef = useRef(null); // To hold the reference to the interval
  const firestore = useFirestore();

  const [userStats, setUserStats] = useState({});
  const [userQuests, setUserQuests] = useState({});
  const [otherUserData, setOtherUserData] = useState({});


  useEffect(() => {
    console.log("useEffect");
    // Run get user data every 10 seconds
    getUserData(process.env.NEXT_PUBLIC_DEMO_EMAIL);
    const interval = setInterval(() => {
      getUserData(process.env.NEXT_PUBLIC_DEMO_EMAIL);
    }, 5000);
  }, []);

  async function getUserData(email) {
    const userDocRef = doc(firestore, 'users', email);
    const userDocSnap = await getDoc(userDocRef);
  
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      // Assuming all other data except for 'quests' and 'stats' collections is other user data
      console.log(userData);
      setOtherUserData(userData);
  
      // Fetch sub-collections for the user
      const collections = ['quests', 'stats']; // Add more collection names if needed
      for (const coll of collections) {
        const collRef = collection(userDocRef, coll);
        const collSnap = await getDocs(collRef);
        const collData = {};
        collSnap.forEach((docSnap) => {
          collData[docSnap.id] = docSnap.data();
        });

        
        if (coll === 'stats') {
          setUserStats(collData);
        } else if (coll === 'quests') {
          setUserQuests(collData);
        }
      }
    } else {
      console.log('No such user document!');
    }
  }

  useEffect(() => {
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
            console.log(reader.result);
            socket.current.emit("receive_image", {
              user_email: process.env.NEXT_PUBLIC_DEMO_EMAIL,
              image: reader.result,
            });
          };
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
