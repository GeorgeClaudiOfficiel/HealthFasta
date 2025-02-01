import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import { Box, Typography, TextField, Button } from '@mui/material';
import { jwtDecode } from 'jwt-decode'; // Correct import path for jwtDecode
import api from '../services/api';

const Settings = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Get the token from local storage
        const token = localStorage.getItem('token');
        if (token) {
            // Decode the token to get the username
            const decoded = jwtDecode(token);
            setUsername(decoded.username);
        }
    }, []);

    const handleLogout = async () => {
        try {
            // Call the logout endpoint using the api instance
            await api.post('/logout');
            // Remove the token from local storage
            localStorage.removeItem('token');
            // Redirect to the login page or home page
            window.location.href = '/';  // Adjust the URL as needed
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <Typography variant="h6" gutterBottom>
                Hey {username}, welcome to your settings!    
            </Typography>
            <Typography variant="body1" gutterBottom>
                More functionalities will be added soon.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Thank you for visiting and using my platform.
                Come back soon!
            </Typography>
            <Box component="form" sx={{ marginTop: 2 }}>
                {/* <TextField
                    fullWidth
                    label="Profile Name"
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                /> */}
                {/* <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                /> */}
                {/* <Button variant="contained" color="primary">
                    Save Changes
                </Button> */}
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default Settings;
