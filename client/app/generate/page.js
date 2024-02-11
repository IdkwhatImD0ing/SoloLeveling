"use client";
import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import styles1 from "../globals.scss"; // Assuming these are correctly set up
import styles from "./generate.scss";

const ModalWithForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    // Initialize Socket.IO connection when component mounts
    socket.current = io("http://localhost:8000");

    socket.current.on("connect", () => {
      console.log("Socket.IO connected");
    });

    // Cleanup on component unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve the selected muscle group from the form
    const selectedMuscleGroup = event.target.dropdown1.value;

    console.log("Form submitted with muscle group:", selectedMuscleGroup);

    // Emit the 'generate_normal_quest' event with the selected muscle group
    if (socket.current && socket.current.connected) {
      socket.current.emit("generate_normal_quest", {
        user_email: process.env.NEXT_PUBLIC_DEMO_EMAIL,
        selected_muscle_group: selectedMuscleGroup,
      });
    }

    setIsModalVisible(false); // Optionally close modal on submit
  };

  const toggleModal = () => setIsModalVisible(!isModalVisible);
  return (
    <>
      <button className="generate-btn" onClick={toggleModal}>
        Start a quest!
      </button>

      {isModalVisible && (
        <div className="modal">
          <h1 className="generate-h1">Start a quest!</h1>
          <form className="generate-form" onSubmit={handleSubmit}>
            <label htmlFor="dropdown1">Choose an option:</label>
            <select id="dropdown1" name="dropdown1">
              <option value="Arms">Arms</option>
              <option value="Chest">Chest</option>
              <option value="Core">Core</option>
              <option value="Back">Back</option>
              <option value="Thigh">Thigh</option>
              <option value="Calves">Calves</option>
            </select>
            <button className="generate-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ModalWithForm;
