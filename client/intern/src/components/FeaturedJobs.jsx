import React from 'react';
import '../styles/FeaturedJobs.css';

const FeaturedJobs = () => {
  const jobs = [
    { id: 1, title: 'Tech Support Specialist', company: 'Google', location: 'Remote', type: 'Full-time' },
    { id: 2, title: 'Senior AWS Engineer', company: 'Microsoft', location: 'Remote', type: 'Full-time' },
    { id: 3, title: 'Marketing Officer', company: 'YouTube', location: 'California', type: 'Part-time' },
    
  ];

  return (
    <section className="featured-jobs">
      <h2>Featured Jobs</h2>
      <h4>Choose jobs from the top employers and apply for the same.</h4>

      <div className="job-cards">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.type}</p>
            <button className="apply-btn">Apply Now</button>
          </div>
        ))}
      </div>
      <button className="view-all-btn">View All</button>
      <div className="companies-hiring">
        <h3>Top Companies Hiring Now</h3>
        <div className="company-logos">
          <img src="client/intern/src/images/Google.png" alt="Google" />
          <img src="client/intern/src/images/Microsoft.jpg" alt="Microsoft" />
          <img src="client/intern/src/images/Flipkart.png" alt="Flipkart" />
          <img src="client/intern/src/images/ibm.jpg" alt="IBM" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
