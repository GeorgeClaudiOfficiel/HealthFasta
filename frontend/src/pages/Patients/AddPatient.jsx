import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import api from '../../services/api';

const AddPatient = () => {
  const [patient, setPatient] = useState({ Name: '', Age: '', Gender: '', Region:'' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/patients', patient); // Assuming backend returns created patient
      const newPatient = response.data; // Get the created patient data including PatientID
      navigate('/patients', { state: { PatientId: newPatient.PatientId } }); // Pass PatientID in navigation state
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>Add Patient</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="Name"
          fullWidth
          margin="normal"
          value={patient.Name}
          onChange={handleChange}
        />
        <TextField
          label="Age"
          name="Age"
          fullWidth
          margin="normal"
          value={patient.Age}
          onChange={handleChange}
        />
        <TextField
          label="Gender"
          name="Gender"
          fullWidth
          margin="normal"
          value={patient.Gender}
          onChange={handleChange}
        />
        <TextField
          label="Region"
          name="Region"
          fullWidth
          margin="normal"
          value={patient.Region}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Add Patient
        </Button>
      </form>
    </Box>
  );
};

export default AddPatient;
