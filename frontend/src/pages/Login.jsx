import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import api from '../services/api';
import Loader from '../components/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add a loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts
    setError(''); // Clear any previous errors
    try {
      const response = await api.post('/auth/login', { Username: email, Password: password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username/email or password');
    } finally {
      setLoading(false); // Set loading to false after login completes
    }
  };

  // If loading is true, display the Loader component
  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>Welcome to HealthFasta</Typography>
      <Typography variant="h7" gutterBottom>Your improved Health Record Management System</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Username/Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;