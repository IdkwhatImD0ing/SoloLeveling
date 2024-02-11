"use client"
import React, { useEffect, useRef } from 'react';
import styles from './exercise.css';

export default function Exercise() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <main>
      <div className={styles.container}> 
        <div className='video__container'>
          <video ref={videoRef} autoPlay playsInline muted></video>
        </div>
        <div className='quests__container'>
          <div className='daily__container'>
          </div>
          <div className='weekly__container'>
          </div>
          <div className='event__container'>
          </div>
        </div>
      </div>
    </main>
  );
}