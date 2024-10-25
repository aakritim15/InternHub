import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import StatusCard from '../components/StatusCard';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
const AppliedJobs = () => {
    const { currentUser } = useAuth(); // Get currentUser which contains the token
    const [appliedJobs, setAppliedJobs] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            if (!currentUser || !currentUser.token) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get("http://localhost:1000/api/apply/myApplications", {
                    headers: {
                        'x-auth-token': currentUser.token // Use token from currentUser
                    }
                });

                // Update the state with the received data
                if (response.data && Array.isArray(response.data)) {
                    setAppliedJobs(response.data);
                } else {
                    setAppliedJobs([]); // Set to an empty array if no jobs found
                }
            } catch (err) {
                console.error(err.response || err);
                setError('Failed to fetch applied jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, [currentUser]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
        <Header/>
            <h2>Applied Jobs</h2>
            {appliedJobs.length === 0 ? (
                <p>No applied jobs found.</p>
            ) : (
                <ul>
                    {appliedJobs.map((job, index) => (
                        <li key={index}  style={{listStyle: "none"}}>
                            {/* <h3>{job.company}</h3>
                            <p>Salary: {job.salary}</p>
                            <p>Description: {job.description}</p>
                            <p>Status: {job.status || 'Pending'}</p> */}
                            <StatusCard companyName={job.company} price={job.salary} role={job.description} status={job.status || 'Accepted'} location={job.location}/>
                        </li>
                    ))}

                    
                </ul>
            )}
            <Footer/>
        </div>
    );
};

export default AppliedJobs;
