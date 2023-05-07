import React from 'react';

const Modal = ({ showModal, onClose, imageSrc }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="image-modal" style={{ display : showModal ? 'block' : 'none' }}>
      <div className="image-modal__overlay" onClick={onClose}></div>
      <div className="image-modal__content">
        <img src={imageSrc} alt="Payment Proof" />
        <button className='close' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
