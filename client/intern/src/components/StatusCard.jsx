// StatusCard.js
import React from 'react';
import '../styles/StatusCard.css'; // Ensure styles are applied

const StatusCard = ({ companyName, role, status, location, price }) => {
  // Determine status class based on status prop
  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      case 'on-hold':
      default:
        return 'status-onHold';
    }
  };

  return (
    <div className="status-card">
      <div className="status-card-left">
        <h3>{companyName}</h3>
        <p>Role: {role}</p>
        <p>Location: {location}</p>
        <p>Salary: {price}</p>
      </div>
      <div className={`status-card-right ${getStatusClass(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </div>
  );
};

export default StatusCard;
