import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import api from '../../services/api';

const AddReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState({
    PatientID: 0, // Initialize PatientID as a number
    Temperature: '',
    BloodPressure: '',
    MeasurementDate: '',
  });

  const isEditMode = !!id; // Check if we are in edit mode

  const fetchReport = async () => {
    try {
      const response = await api.get(`/physiological-data/${id}`);
      setReport(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/physiological-data', report);
      navigate('/reports');
    } catch (error) {
      console.error('Error adding report:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/physiological-data/${id}`, report);
      navigate('/reports');
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      fetchReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? 'Edit Health Report' : 'Add Health Report'}
      </Typography>
      <form onSubmit={isEditMode ? handleUpdate : handleAdd}>
        <TextField
          label="Patient Id"
          name="PatientID"
          fullWidth
          margin="normal"
          type="number"
          value={report.PatientID}
          onChange={handleChange}
        />
        <TextField
          label="Temperature in Celsius"
          name="Temperature"
          fullWidth
          margin="normal"
          value={report.Temperature}
          onChange={handleChange}
        />
        <TextField
          label="Blood Pressure in mmHg"
          name="BloodPressure"
          fullWidth
          margin="normal"
          value={report.BloodPressure}
          onChange={handleChange}
        />
        <TextField
          label="Measurement Date YYYY-MM-DD"
          name="MeasurementDate"
          fullWidth
          margin="normal"
          value={report.MeasurementDate}
          onChange={handleChange}
        />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {!isEditMode && (
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Report
              </Button>
            </Grid>
          )}
          {isEditMode && (
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Report
              </Button>
            </Grid>
          )}
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => navigate('/reports')}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddReport;