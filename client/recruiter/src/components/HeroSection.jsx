import React from 'react';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1>Find a job that aligns with your interests and skills</h1>
      <p>Thousands of jobs are waiting for you.</p>
      <div className="job-search-form">
        <input type="text" placeholder="Job title or keyword" />
        <input type="text" placeholder="Location" />
        <button className="search-btn">Find Jobs</button>
      </div>
    </section>
  );
};

export default HeroSection;
