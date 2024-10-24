import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios'; // Import axios
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CreateJobListing() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    location: '',
    jobType: '',
    description: '',
    salary: '',
  });

  const { jobTitle, location, jobType, description, salary } = formData;

  const { currentUser } = useAuth();  // Assuming useAuth provides the user and token
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Display userId for debugging purposes
    console.log("User ID: ", currentUser?.id);

    const jobData = {
      jobTitle: jobTitle,
      location,
      jobType,
      description,
      salary,
    };

    try {
      // Send the job listing data to your backend API
      const response = await axios.post(
        'http://localhost:1000/api/recruiter/post', 
        jobData, 
        {
          headers: {
            'x-auth-token': currentUser?.token,  // Assuming token is stored in currentUser
            'Content-Type': 'application/json',
          },
        }
      );

      // Success feedback and navigation
      alert('Job listing created successfully!');
      console.log('Job Listing Response:', response.data);
      navigate('/createjobs');
    } catch (error) {
      console.error('Error creating job listing:', error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '600px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        padding: 3,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center">
        Create a New Job Listing
      </Typography>

      <TextField
        label="Job Title"
        name="jobTitle"
        variant="outlined"
        required
        fullWidth
        value={jobTitle}
        onChange={handleChange}
      />

      <TextField
        label="Location"
        name="location"
        variant="outlined"
        required
        fullWidth
        value={location}
        onChange={handleChange}
      />

      <FormControl fullWidth required>
        <InputLabel>Job Type</InputLabel>
        <Select
          name="jobType"
          value={jobType}
          onChange={handleChange}
          label="Job Type"
        >
          <MenuItem value="Full-time">Full-time</MenuItem>
          <MenuItem value="Part-time">Part-time</MenuItem>
          <MenuItem value="Internship">Internship</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Job Description"
        name="description"
        variant="outlined"
        multiline
        rows={4}
        required
        fullWidth
        value={description}
        onChange={handleChange}
      />

      <TextField
        label="Salary"
        name="salary"
        variant="outlined"
        fullWidth
        value={salary}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Create Job Listing'}
      </Button>
    </Box>
  );
}
