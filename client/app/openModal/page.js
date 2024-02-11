'use client'

import React, { useState, useCallback } from 'react';
import Modal from './Modal'; // Adjust the path as needed

const openModal = () => {
  const [showModal, setShowModal] = useState(false);

  const showModalForSixSeconds = useCallback(() => {
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 6000); // 6000ms = 6 seconds
  }, []);

  return (
    <div>
      <button onClick={showModalForSixSeconds}>Show Modal</button>
      <Modal isVisible={showModal}>
        <p>This modal will disappear after 6 seconds.</p>
      </Modal>
    </div>
  );
};

export default openModal;

