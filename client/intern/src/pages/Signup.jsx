import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch'; // Import Switch component
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios'; // Import Axios
import * as React from 'react';
import ColorModeSelect from '../components/ColorModeSelecct';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Register(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = React.useState('');
  const [isRecruiter, setIsRecruiter] = React.useState(false); // State for user role

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
      role: isRecruiter ? 'recruiter' : 'intern', // Capture role
    };

    try {
      const response = await axios.post(`http://localhost:1000/api/${userData.role}`, userData);
      console.log('Registration successful:', response.data);
      // Handle success (e.g., redirect, show success message, etc.)
    } catch (error) {
      console.error('Registration error:', error.response.data);
      // Handle error (e.g., show error message)
      console.log(error)
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
    <div>
      <RegisterContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <TextField
                id="fullName"
                type="text"
                name="fullName"
                placeholder="John Doe"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
              <TextField
                error={passwordConfirmError}
                helperText={passwordConfirmErrorMessage}
                name="passwordConfirm"
                placeholder="••••••"
                type="password"
                id="passwordConfirm"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControlLabel
              control={<Switch checked={isRecruiter} onChange={handleRoleToggle} />}
              label={isRecruiter ? 'Recruiter' : 'Intern'}
              sx={{ justifyContent: 'space-between', marginTop: '1rem' }}
            />
            <FormControlLabel
              control={<Checkbox value="terms" color="primary" />}
              label="I agree to the terms and conditions"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Register
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <span>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Sign in
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </RegisterContainer>
    </div>
  );
}
