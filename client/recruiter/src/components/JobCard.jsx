import React from 'react';
import '../styles/Components.css';
function JobCard() {
  return (
    <div className="job-card">
      <h3>Technical Support Specialist</h3>
      <p>Google Inc. - San Francisco, CA</p>
      <p>Salary: $50,000 - $70,000</p>
      <div className="job-card-footer">
        <button>View Details</button>
        <button>Apply Now</button>
      </div>
    </div>
  );
}

export default JobCard;
