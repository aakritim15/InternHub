// InternStatusPage.js
import React, { useState } from 'react';
import StatusCard from '../components/StatusCard';
import '../styles/InternStatusPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
const InternStatusPage = () => {
  const [statuses, setStatuses] = useState({
    google: 'on-hold',
    facebook: 'rejected',
    amazon: 'accepted',
  });

  const updateStatus = (company, newStatus) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [company]: newStatus,
    }));
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Intern Application Status</h2>

        {/* Status Cards with additional props for location and price */}
        <StatusCard
          companyName="Google"
          role="UI/UX Designer"
          status={statuses.google}
          location="Mountain View, CA"
          price="Rs1,00,000/year"
        />
        <StatusCard
          companyName="Facebook"
          role="Frontend Developer"
          status={statuses.facebook}
          location="Menlo Park, CA"
          price="Rs1,20,000/year"
        />
        <StatusCard
          companyName="Amazon"
          role="Backend Engineer"
          status={statuses.amazon}
          location="Seattle, WA"
          price="Rs1,10,000/year"
        />
        <Footer/>
        {/* Buttons to change status */}
        {/* <div className="button-container">
          <h2>Update Status:</h2>
          <div className="button-row">
            <span>Google:</span>
            <button onClick={() => updateStatus('google', 'accepted')}>Accept</button>
            <button onClick={() => updateStatus('google', 'rejected')}>Reject</button>
            <button onClick={() => updateStatus('google', 'on-hold')}>On Hold</button>
          </div>

          <div className="button-row">
            <span>Facebook:</span>
            <button onClick={() => updateStatus('facebook', 'accepted')}>Accept</button>
            <button onClick={() => updateStatus('facebook', 'rejected')}>Reject</button>
            <button onClick={() => updateStatus('facebook', 'on-hold')}>On Hold</button>
          </div>

          <div className="button-row">
            <span>Amazon:</span>
            <button onClick={() => updateStatus('amazon', 'accepted')}>Accept</button>
            <button onClick={() => updateStatus('amazon', 'rejected')}>Reject</button>
            <button onClick={() => updateStatus('amazon', 'on-hold')}>On Hold</button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default InternStatusPage;
