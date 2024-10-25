  import React, { useState } from 'react';
import '../styles/HeroSection.css';

  const HeroSection = ({ onSearch }) => {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = () => {
      onSearch(jobTitle, location); // Call the search function passed as a prop
    };

    return (
      <section className="hero-section">
        <h1>Find a job that aligns with your interests and skills</h1>
        <p>Thousands of jobs are waiting for you.</p>
        {/* <div className="job-search-form">
          <input
            type="text"
            placeholder="Job title or keyword"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)} // Update jobTitle state
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)} // Update location state
          />
          <button className="search-btn" onClick={handleSearch}>Find Jobs</button>
        </div> */}
      </section>
    );
  };

  export default HeroSection;
