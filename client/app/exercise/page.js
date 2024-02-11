"use client";
import React, {useEffect, useRef} from "react";
import styles from "./exercise.scss";
import styles1 from "../globals.scss";
import Quests from "../quest/page";
import NavBar from "../navbar/page";

export default function Exercise() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video : true})
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch((err) => console.error(err));
    }
  }, []);

  return (
    <main>
      <NavBar />
      <div className="container">
        <div className="video__container">
          <video
  className = "video"
  ref = {videoRef} autoPlay
  playsInline
            muted
          ></video>
        </div>
        <Quests />
      </div>
    </main>
  );
}
