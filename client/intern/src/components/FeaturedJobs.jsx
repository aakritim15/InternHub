import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

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
      const response = await axios.post(`http://localhost:1000/api/apply/${jobId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${currentUser.token}`, // Use token from AuthContext
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      console.error(error.response ? error.response.data : error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center mt-12 p-6 bg-red-100 border border-red-400 rounded-lg shadow-md">
        <p className="text-center text-red-600 font-semibold text-xl mb-4">
          Please log in to view featured jobs.
        </p>
      </div>
    );
  }

  return (
    <section className="featured-jobs p-6">
      {/* Animated Header */}
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-400 animate-pulse mb-4 text-center">
        Featured Jobs
      </h2>
      <h4 className="text-xl mb-6 text-gray-600 text-center">Choose jobs from the top employers and apply for the same.</h4>

      {/* Job Cards */}
      <div className="job-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="job-card bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300"
            >
              <h3 className="font-bold text-xl text-purple-700">{job.title}</h3>
              <p className="font-bold text-lg text-gray-800">{job.company}</p>
              <p className="text-gray-600">{job.location}</p>
              <p className="text-gray-600">{job.description}</p>
              <form
                onSubmit={(event) => handleSubmit(event, job._id)}
                className="mt-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <input
                  type="file"
                  name="resume"
                  className="border border-purple-400 rounded-md p-2 focus:ring-2 focus:ring-purple-500 bg-white"
                />{" "}
                {/* Resume file input */}
                <button
                  type="submit"
                  className="apply-btn bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 transition-colors"
                >
                  Apply Now
                </button>
              </form>
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>

      {/* View All Button */}
      <button className="view-all-btn mt-8 bg-purple-700 text-white py-3 px-6 rounded-md hover:bg-purple-900 transition-transform transform hover:scale-105">
        View All
      </button>

      {/* Companies Hiring Section */}
      <div className="companies-hiring mt-12">
        <h3 className="text-2xl font-bold mb-4 text-center">Top Companies Hiring Now</h3>
        <div className="company-logos grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          <img
            src="/Google.png"
            alt="Google"
            className="w-24 h-24 object-contain transition-transform transform hover:scale-110"
          />
          <img
            src="/Microsoft.jpg"
            alt="Microsoft"
            className="w-24 h-24 object-contain transition-transform transform hover:scale-110"
          />
          <img
            src="/Flipkart.png"
            alt="Flipkart"
            className="w-24 h-24 object-contain transition-transform transform hover:scale-110"
          />
          <img
            src="/ibm.jpg"
            alt="IBM"
            className="w-24 h-24 object-contain transition-transform transform hover:scale-110"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
