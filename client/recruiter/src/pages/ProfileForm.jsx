import { Button, Grid as Grid2, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Styled Components
const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: 'auto',
  maxWidth: 800,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    description: '',
    skills: '',
    githubusername: '',
    youtube: '',
    twitter: '',
    linkedin: '',
    instagram: '',
  });

  const [profiles, setProfiles] = useState([]); // State to store profiles
  const { company, website, location, description, skills, githubusername, youtube, twitter, linkedin, instagram } = formData;
  const { currentUser } = useAuth();

  // Fetch profiles from backend
  const fetchProfiles = async () => {
    try {
      const res = await axios.get('http://localhost:1000/api/recruiter/getProfile', {
        headers: {
          'x-auth-token': currentUser.token, // Authentication token
        },
      });
      setProfiles(res.data); // Set the profiles data in the state
    } catch (error) {
      console.error('Error fetching profiles:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProfiles(); // Fetch profiles when component mounts
  }, [currentUser]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      company,
      website,
      location,
      description,
      skills,
      githubusername,
      youtube,
      twitter,
      linkedin,
      instagram,
    };

    try {
      const res = await axios.post(
        'http://localhost:1000/api/recruiter/createProfile',
        profileData,
        {
          headers: {
            'x-auth-token': currentUser.token,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Profile created', res.data);
    } catch (error) {
      console.error('Error creating profile', error.response?.data || error.message);
    }
  };

  return (
    <Root>
      <Typography variant="h5" gutterBottom>
        Create Your Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid2 container columns={12} spacing={2}>
          <Grid2>
            <StyledTextField
              label="Website"
              name="website"
              value={website}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              fullWidth
            />
            <StyledTextField
              label="Company"
              name="company"
              value={company}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              fullWidth
            />
          </Grid2>
          <Grid2>
            <StyledTextField
              label="Location"
              name="location"
              value={location}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              fullWidth
            />
          </Grid2>
          <Grid2>
            <StyledTextField
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              fullWidth
              multiline
              rows={4}
            />
          </Grid2>
          <Grid2>
            <StyledButton type="submit" variant="contained" color="primary" fullWidth>
              Submit Profile
            </StyledButton>
          </Grid2>
        </Grid2>
      </form>

      
    </Root>
  );
};

export default ProfileForm;
