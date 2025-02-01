import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import api from '../../services/api';
import Loader from '../../components/Loader'; //import path for the loader

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({ Name: '', Age: '', Gender: '', Region: '' });
  const [loading, setLoading] = useState(true); // Add a loading state

  const fetchPatient = async () => {
    try {
      const response = await api.get(`/patients/${id}`);
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false); // Set loading to false when the data is fetched
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/patients/${id}`, patient);
      navigate('/patients');
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  useEffect(() => {
    fetchPatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // If loading is true, display the Loader component
  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>Edit Patient</Typography>
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
          Update Patient
        </Button>
      </form>
    </Box>
  );
};

export default EditPatient;
