// src/JobApplicants.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have a useAuth hook for authentication

const JobApplicants = () => {
    const { jobId } = useParams(); // Get the job ID from the URL parameters
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth(); // Get the current user from AuthContext

    useEffect(() => {
        const fetchApplicants = async () => {
            if (!currentUser) {
                return setError("User not authenticated"); // Handle if user is not authenticated
            }

            try {
                const response = await axios.get(`http://localhost:1000/api/apply/${jobId}/applicants`, {
                    headers: {
                        'x-auth-token': currentUser.token, // Include the auth token in the headers
                    },
                });
                setApplicants(response.data.applicants || []);
            } catch (err) {
                setError(err.response ? err.response.data.msg : 'Error fetching applicants');
            }
        };

        fetchApplicants();
    }, [jobId, currentUser]); // Update dependency to jobId and currentUser

    return (
        <div>
            <h2>Applicants for Job ID: {jobId}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {applicants.length === 0 ? (
                <p>No applicants found for this job.</p>
            ) : (
                <ul>
                    {applicants.map(applicant => (
                        <li key={applicant.applicantId} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                            <h3>{applicant.name || 'N/A'}</h3>
                            <p><strong>Email:</strong> {applicant.email || 'N/A'}</p>
                            <p><strong>Experience:</strong> {applicant.experience || 'N/A'}</p>
                            <p><strong>Education:</strong> {applicant.education || 'N/A'}</p> {/* Show education */}
                            <p><strong>Status:</strong> {applicant.status || 'N/A'}</p> {/* Show status */}
                            {/* Display resume link if it exists */}
                            {applicant.resumeFileId && (
                                <a href={`http://localhost:1000/api/resumes/${applicant.resumeFileId}`} target="_blank" rel="noopener noreferrer">
                                    View Resume
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobApplicants;
