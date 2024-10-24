import { Box, Button, Grid as Grid2, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const SocialLinksHeading = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ProfileForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    website: '',
    location: '',
    description: '',
    skills: '',
    githubusername: '',
    youtube: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    resume: null,
  });
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeUrl, setResumeUrl] = useState(''); // URL for the resume

  const { website, location, description, skills, githubusername, youtube, twitter, linkedin, instagram } = formData;
  const { currentUser } = useAuth();

  const fetchProfile = async (token) => {
    if (!token) return; // No token available
    try {
      const res = await axios.get('http://localhost:1000/api/intern/getProfile', {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null; // Return null if there was an error
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (currentUser?.token) {
        const profileData = await fetchProfile(currentUser.token);
        if (profileData) {
          setFormData({
            website: profileData.website || '',
            location: profileData.location || '',
            description: profileData.description || '',
            skills: profileData.skills || '',
            githubusername: profileData.githubusername || '',
            youtube: profileData.youtube || '',
            twitter: profileData.twitter || '',
            linkedin: profileData.linkedin || '',
            instagram: profileData.instagram || '',
            resume: profileData.resume || '', // Adjust based on your backend response
          });
          setResumeUrl(profileData.resumeUrl || ''); // Assuming your API returns the URL of the resume
          setResumeFileName(profileData.resumeFileName || ''); // Assuming your API returns the filename
        }
      }
    };

    loadProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    setFormData({ ...formData, resume: file });
    setResumeFileName(file ? file.name : ''); // Set the file name to state
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting in the default way
    const profileData = new FormData(); // Using FormData to handle both text fields and file uploads
    profileData.append('website', website);
    profileData.append('location', location);
    profileData.append('description', description);
    profileData.append('skills', skills);
    profileData.append('githubusername', githubusername);
    profileData.append('resume', formData.resume); // Add resume file to form data

    try {
      const res = await axios.post(
        'http://localhost:1000/api/intern/createProfile',
        profileData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set correct content type for file upload
            'x-auth-token': currentUser.token,
          },
        }
      );
      console.log('Profile created', res.data);
      setResumeUrl(res.data.resumeUrl); // Assuming the backend returns the resume URL
      setResumeFileName(res.data.resumeFileName); // Assuming the backend returns the resume filename

      navigate('/'); // Redirect after successful submission
    } catch (error) {
      console.error('Error creating profile', error.message);
    }
  };

  return (
    <Root>
      <Typography variant="h5" gutterBottom>
        Create Your Profile
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid2 container columns={12} spacing={2}>
          <Grid2 xs={12}>
            <StyledTextField
              label="Website"
              name="website"
              value={website}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12}>
            <StyledTextField
              label="Location"
              name="location"
              value={location}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12}>
            <StyledTextField
              label="Description"
              name="description"
              value={description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid2>
          <Grid2 xs={12}>
            <StyledTextField
              label="Skills (comma separated)"
              name="skills"
              value={skills}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12}>
            <StyledTextField
              label="GitHub Username"
              name="githubusername"
              value={githubusername}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>

          <Grid2 xs={12}>
            <Box>
              <input
                accept="application/pdf"
                style={{ display: 'none' }}
                id="resume-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="resume-upload">
                <StyledButton variant="contained" color="primary" component="span">
                  Upload Resume
                </StyledButton>
              </label>
              {resumeFileName && ( // Display the uploaded resume file name
                <Typography variant="body2" style={{ marginTop: '8px' }}>
                  Uploaded Resume: {resumeFileName}
                  {resumeUrl && ( // If resume URL is available, provide a download link
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px' }}>
                      Download
                    </a>
                  )}
                </Typography>
              )}
            </Box>
          </Grid2>
          <Grid2 xs={12}>
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
