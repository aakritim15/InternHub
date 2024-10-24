import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ColorModeSelect from '../components/ColorModeSelecct';
import { useAuth } from '../context/AuthContext';

export default function Register(props) {
  const { isAuthenticated, login } = useAuth();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = React.useState('');
  const [isRecruiter, setIsRecruiter] = React.useState(false);

  const navigate = useNavigate();

  const handleRoleToggle = () => {
    setIsRecruiter((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError || passwordError || passwordConfirmError) return;

    const data = new FormData(event.currentTarget);
    const userData = {
      name: data.get('fullName'),
      email: data.get('email'),
      password: data.get('password'),
      role: isRecruiter ? 'recruiter' : 'intern',
    };
    console.log(userData)

    try {
      const response = await axios.post(`http://localhost:1000/api/${userData.role}`, userData);
      console.log('Registration successful:', response.data);
      login(response.data);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response.data);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('passwordConfirm');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (password.value !== passwordConfirm.value) {
      setPasswordConfirmError(true);
      setPasswordConfirmErrorMessage('Passwords do not match.');
      isValid = false;
    } else {
      setPasswordConfirmError(false);
      setPasswordConfirmErrorMessage('');
    }

    return isValid;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        padding: 2,
        position: 'relative',
      }}
    >
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Card
        variant="outlined"
        sx={{
          padding: 4,
          maxWidth: '450px',
          width: '100%',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center', mb: 2 }}
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl fullWidth>
            <FormLabel htmlFor="fullName">Full Name</FormLabel>
            <TextField
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              autoComplete="name"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              id="password"
              name="password"
              placeholder="••••••"
              type="password"
              autoComplete="new-password"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
            <TextField
              error={passwordConfirmError}
              helperText={passwordConfirmErrorMessage}
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="••••••"
              type="password"
              autoComplete="new-password"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>

          <FormControlLabel
            control={<Switch checked={isRecruiter} onChange={handleRoleToggle} />}
            label={isRecruiter ? 'Recruiter' : 'Intern'}
            sx={{ justifyContent: 'space-between' }}
          />

          <FormControlLabel
            control={<Checkbox value="terms" color="primary" />}
            label="I agree to the terms and conditions"
          />

          <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
            Register
          </Button>

          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            Already have an account?{' '}
            <Link href="/login" variant="body2">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
