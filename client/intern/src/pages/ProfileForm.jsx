import { Box, Button, Grid2, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useState } from 'react';
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
  const [token, setToken] = useState('');
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

  const { website, location, description, skills, githubusername, youtube, twitter, linkedin, instagram } = formData;

  const { isAuthenticated, userId, currentUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };
  console.log("Current Token:", currentUser.token); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = new FormData();
    profileData.append('website', website);
    profileData.append('location', location);
    profileData.append('description', description);
    profileData.append('skills', skills);
    profileData.append('githubusername', githubusername);
    profileData.append('youtube', youtube);
    profileData.append('twitter', twitter);
    profileData.append('linkedin', linkedin);
    profileData.append('instagram', instagram);
    profileData.append('resume', formData.resume);

    try {
        console.log("test1")
      const res = await axios.post('http://localhost:1000/api/intern/createProfile', 
        profileData,
        {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token':`${currentUser.token}`
                }
        }
      );
      console.log('Profile created', res.data);
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
            <SocialLinksHeading variant="h6">Social Links</SocialLinksHeading>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <StyledTextField
              label="YouTube"
              name="youtube"
              value={youtube}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <StyledTextField
              label="Twitter"
              name="twitter"
              value={twitter}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <StyledTextField
              label="LinkedIn"
              name="linkedin"
              value={linkedin}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <StyledTextField
              label="Instagram"
              name="instagram"
              value={instagram}
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
