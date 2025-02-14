import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import path for useNavigate
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography } from '@mui/material';
import api from '../../services/api';
import Loader from '../../components/Loader'; // Correct import path for Loader

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();
  const fetchReports = async () => {
    try {
      const response = await api.get('/physiological-data'); // Adjust to your backend route
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // If loading is true, display the Loader component
  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Health Reports</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/reports/add')} sx={{ mb: 2 }}>
        Add Health Report
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Id</TableCell>
            <TableCell>Temperature</TableCell>
            <TableCell>Blood Pressure</TableCell>
            <TableCell>MeasurementDate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.DataId}>
              <TableCell>{report.PatientID}</TableCell>
              <TableCell>{report.Temperature}</TableCell>
              <TableCell>{report.BloodPressure}</TableCell>
              <TableCell>{report.MeasurementDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ReportsList;
