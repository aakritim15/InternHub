// src/MyJobs.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have a useAuth hook for authentication

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();  // Get the current user from AuthContext
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchJobs = async () => {
            if (!currentUser) {
                return setError("User not authenticated"); // Handle if user is not authenticated
            }
            
            try {
                const response = await axios.get('http://localhost:1000/api/apply/myjobs', {
                    headers: {
                        'x-auth-token': currentUser.token, // Include the auth token in the headers
                    },
                });
                setJobs(response.data); // Set the jobs state with the fetched data
            } catch (err) {
                setError(err.response ? err.response.data.msg : 'Error fetching jobs');
            }
        };

        fetchJobs();
    }, [currentUser]); // Update dependency to currentUser

    // Function to handle job click
    const handleJobClick = (jobId) => {
        navigate(`/jobs/${jobId}/applicants`); // Navigate to the JobApplicants component
    };

    return (
        <div>
            <h2>My Jobs</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {jobs.map(job => (
                    <li key={job._id} onClick={() => handleJobClick(job._id)} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Salary:</strong> ${job.salary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyJobs;
