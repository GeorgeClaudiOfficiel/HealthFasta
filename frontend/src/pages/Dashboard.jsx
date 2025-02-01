import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
// import Grid2 from '@mui/material/Unstable_Grid2'; // Correct import for Grid2
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Grid } from '@mui/system';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch patient data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/patients'); // Adjust to match your backend route
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } 
    };
    
    // Fetch reports data
    const fetchReports = async () => {
      try {
        const response = await api.get('/physiological-data'); // Adjust to match your backend route
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
    fetchReports();
  }, []);

  // Process data for the chart
  const processData = () => {
    const regions = ['Kiambu', 'Nyahururu', 'Nyeri']; // Replace with your actual regions
    const genders = ['M', 'F'];

    // Initialize data structure
    const data = {
      labels: regions,
      datasets: genders.map((gender) => ({
        label: gender,
        data: regions.map((region) =>
          patients.filter((patient) => patient.Region === region && patient.Gender === gender).length
        ),
        backgroundColor: gender === 'M' ? 'rgba(54, 162, 235, 0.8)' : 'rgba(255, 99, 132, 0.8)',
      })),
    };
    
    console.log('Processed Data:', data); // Log the data to the console
    return data;
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Patients by Region and Gender',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Number of Patients',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Regions',
        },
      },
    },
  };

  const token = localStorage.getItem('token');
  if (!token) {
    return <Typography variant="h6">You are not authenticated. Please log in.</Typography>;
  }

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
  <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Patients</Typography>
              <Typography variant="h4">{patients.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Reports</Typography>
              <Typography variant="h4">{reports.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Grouped Bar Chart */}
      <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Patient Distribution by Region and Gender
          </Typography>
          <Box sx={{ flexGrow: 1, width: '120%', margin: 'auto' }}>
            <Bar data={processData()} options={options} />
          </Box>
        </Box>
    </Box>
  </Box>
  );
};

export default Dashboard;
