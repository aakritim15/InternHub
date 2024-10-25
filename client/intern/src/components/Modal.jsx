// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-md">
        <h2 className="text-xl font-bold mb-4">Login Required</h2>
        <p className="mb-4">Please log in to view featured jobs.</p>
        <button onClick={onClose} className="bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
