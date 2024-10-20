import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import '../styles/FeaturedJobs.css';

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]); // State to store fetched jobs
  const { isAuthenticated, userId, currentUser } = useAuth(); // Get userId and token from context
  const { id } = useParams(); // Get the 'id' parameter from the URL

  // Fetch jobs when the component is mounted
  useEffect(() => {
    const getJobs = async () => {
      try {
        // Fetch jobs from the backend
        const response = await axios.get('http://localhost:1000/api/recruiter/post');
        setJobs(response.data); // Set the fetched jobs in state
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    getJobs();
  }, []);

  const handleSubmit = async (event, jobId) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Add the job ID and user ID to the form data
    formData.append('jobId', jobId); // Ensure the key matches what your backend expects
    console.log('job id is: ', jobId)
    formData.append('userId', userId); // Use userId from AuthContext
    console.log("use rid is:", userId)
    console.log("Current Token:", currentUser.token); // Log the token for debugging
  
    try {
      console.log("test1")
      const response = await axios.post(`http://localhost:1000/api/apply/${jobId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${currentUser.token}`, // Use token from AuthContext
        },
      });
      console.log("test2")
      console.log(response.data);
      // Optionally refresh the job list or update state if necessary
    } catch (error) {
      console.error(error)
      console.error( error.response ? error.response.data : error.message);
    }
  };
  

  if (!isAuthenticated) {
    return <p>Please log in to view featured jobs.</p>; // Message if user is not authenticated
  }

  return (
    <section className="featured-jobs">
      <h2>Featured Jobs</h2>
      <h4>Choose jobs from the top employers and apply for the same.</h4>

      <div className="job-cards">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.description}</p>
              <form onSubmit={(event) => handleSubmit(event, job._id)}>
                <input type="file" name="resume"  /> {/* Resume file input */}
                <button type="submit" className="apply-btn">Apply Now</button>
              </form>
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
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
