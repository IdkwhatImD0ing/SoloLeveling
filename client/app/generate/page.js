'use client'
import React, { useState } from 'react';
import styles1 from "../globals.scss";
import styles from "./generate.scss";

const ModalWithForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");
        // Process form data here
        setIsModalVisible(false); // Optionally close modal on submit
    };

    const toggleModal = () => setIsModalVisible(!isModalVisible);

    return (
        <>
            <button className="generate-btn" onClick={toggleModal}>Start a quest!</button>

            {isModalVisible && (
                <div className="modal">
                    <h1 className="generate-h1">Start a quest!</h1>
                    <form className="generate-form" onSubmit={handleSubmit}>
                        <label htmlFor="dropdown1">Choose an option:</label>
                        <select id="dropdown1" name="dropdown1">
                            <option value="option1">Arms</option>
                            <option value="option2">Chest</option>
                            <option value="option3">Core</option>
                            <option value="option4">Back</option> {/* Ensure unique values */}
                            <option value="option5">Thigh</option>
                            <option value="option6">Calves</option>
                            {/* Add more options as needed */}
                        </select>
                        <button className='generate-btn' type="submit">Submit</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ModalWithForm;
