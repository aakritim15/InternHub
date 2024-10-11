import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/JobForm.css';
const PostJobForm = () => {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    jobType: '',
    from: '',
    to: '',
    minSalary: '',
    maxSalary: '',
    presentation: '',
    jobLevel: '',
    benefits: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    setJobDetails({
      ...jobDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Posted:', jobDetails);
  };

  return (
    <>
      <Header />
      <div className="post-job-container">
        <form className="post-job-form" onSubmit={handleSubmit}>
          <h2>Post a Job</h2>
          
          {/* Job Title */}
          <div className="form-group">
            <label>Job Title</label>
            <input 
              type="text" 
              name="jobTitle" 
              value={jobDetails.jobTitle} 
              onChange={handleChange} 
              placeholder="Job title, for example: UI/UX Designer"
              required
            />
          </div>

          {/* Job Type */}
          <div className="form-group">
            <label>Job Type</label>
            <select name="jobType" value={jobDetails.jobType} onChange={handleChange} required>
              <option value="">Select...</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          {/* Salary */}
          <div className="form-group">
            <label>Salary</label>
            <div className="salary-inputs">
              <input 
                type="number" 
                name="minSalary" 
                value={jobDetails.minSalary} 
                onChange={handleChange} 
                placeholder="Min"
                required 
              />
              <input 
                type="number" 
                name="maxSalary" 
                value={jobDetails.maxSalary} 
                onChange={handleChange} 
                placeholder="Max"
                required 
              />
            </div>
          </div>

          {/* Presentation */}
          <div className="form-group">
            <label>Presentation</label>
            <select name="presentation" value={jobDetails.presentation} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="Remote">Remote</option>
              <option value="In-office">In-office</option>
            </select>
          </div>

          {/* Job Level */}
          <div className="form-group">
            <label>Job Level</label>
            <select name="jobLevel" value={jobDetails.jobLevel} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          {/* Benefits */}
          <div className="form-group">
            <label>Benefits</label>
            <input 
              type="text" 
              name="benefits" 
              value={jobDetails.benefits} 
              onChange={handleChange} 
              placeholder="Health, Dental, etc."
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              name="location" 
              value={jobDetails.location} 
              onChange={handleChange} 
              placeholder="City, Country"
            />
          </div>

          {/* Job Description */}
          <div className="form-group">
            <label>Job Description</label>
            <textarea 
              name="description" 
              value={jobDetails.description} 
              onChange={handleChange} 
              placeholder="Write your description..." 
              required
            />
          </div>

          <button type="submit" className="submit-btn">Post Job</button>
        </form>
      </div>
    </>
  );
};

export default PostJobForm;
