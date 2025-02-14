import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import Loader from '../../components/Loader'; // Correct import path for Loader

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Add a loading state
  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients'); // Adjust to match your backend route
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      setPatients(patients.filter((patient) => patient.id !== id));
      toast.success('Patient deleted successfully!'); // Show success notification
      await fetchPatients(); // Refresh the patient list
    } catch (error) {
      console.error('Error deleting patient:', error);
      toast.error('Failed to delete patient. Please try again!'); // Show error notification
    }
  };

  useEffect(() => {
    fetchPatients();
    if (location.state?.PatientId) {
      toast.success(`New patient added with ID: ${location.state.PatientId}`);
    }
  }, [location.state]);

  // If loading is true, display the Loader component
  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Patients List</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/patients/add')} sx={{ mb: 2 }}>
        Add New Patient
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.PatientID}>
              <TableCell>{patient.Name}</TableCell>
              <TableCell>{patient.Age}</TableCell>
              <TableCell>{patient.Gender}</TableCell>
              <TableCell>{patient.Region}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/patients/edit/${patient.PatientID}`)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(patient.PatientID)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Box>
  );
};

export default PatientsList;
