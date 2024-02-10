"use client";
import React, { useEffect, useRef } from "react";

export default function Exercise() {
  const videoRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <main>
      <h1>Exercise</h1>
      <p>
        Get started by editing <code>app/exercise.js</code>
      </p>
      <video ref={videoRef} autoPlay />
    </main>
  );
}
