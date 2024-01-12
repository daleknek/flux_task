import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { signUp } from '../services/apiService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signUp(formData);
      console.log('Signup response:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <>
      <Header />
      <Box
        display='flex'
        flexDirection='column'
        height='70vh'
        justifyContent='center'
      >
        <Container component='main' maxWidth='xs'>
          <Typography variant='h5' align='center' gutterBottom>
            Signup
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              autoComplete='username'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              value={formData.email}
              onChange={handleChange}
              autoComplete='email'
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='password'
              label='Password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              autoComplete='current-password'
              type='password'
            />
            <Box mt={3}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
              >
                Signup
              </Button>
              <p>
                Already have an account? <Link to='/login'>Login</Link>
              </p>
            </Box>
          </form>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default SignUp;
