import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Autocomplete,
  Chip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import Loader from '../../components/Loader';

const DiagnosisList = () => {
  const [searchPatientId, setSearchPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [physiologicalData, setPhysiologicalData] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [newDiagnosis, setNewDiagnosis] = useState({
    DiagnosisSummary: '',
    DiagnosisDate: '',
  });
  const [loading, setLoading] = useState(false);

  // New state for symptom selection and prediction
  const [symptoms, setSymptoms] = useState([]); // List of all available symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // Symptoms selected by the user
  const [predictedDiseases, setPredictedDiseases] = useState([]); // Predicted diseases
  const [searchTerm, setSearchTerm] = useState(''); // Search term for symptoms

  // Fetch symptoms from the backend
  const fetchSymptoms = async () => {
    try {
      const response = await api.get('/symptoms');
      setSymptoms(response.data);
    } catch (error) {
      console.error('Error fetching symptoms:', error);
      toast.error('Failed to fetch symptoms. Please try again.');
    }
  };

  // Fetch patient details
  const fetchPatientDetails = async () => {
    if (!searchPatientId) return;

    setLoading(true);
    try {
      // Fetch patient details
      const patientResponse = await api.get(`/patients/${searchPatientId}`);
      setPatient(patientResponse.data);

      // Fetch physiological data for the patient
      const physiologicalResponse = await api.get('/physiological-data');
      const filteredPhysiologicalData = physiologicalResponse.data.filter(
        (data) => data.PatientID === parseInt(searchPatientId)
      );
      setPhysiologicalData(filteredPhysiologicalData);

      // Fetch diagnoses for the patient
      const diagnosesResponse = await api.get('/diagnoses');
      const filteredDiagnoses = diagnosesResponse.data.filter(
        (diagnosis) => diagnosis.PatientID === parseInt(searchPatientId)
      );
      setDiagnoses(filteredDiagnoses);
    } catch (error) {
      console.error('Error fetching patient details:', error);
      toast.error('Failed to fetch patient details. Please try again.');
      setPatient(null);
      setPhysiologicalData([]);
      setDiagnoses([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle symptom selection
  const handleSymptomChange = (event, value) => {
    if (value && !selectedSymptoms.includes(value)) {
      setSelectedSymptoms([...selectedSymptoms, value]);
      setSearchTerm(''); // Clear the search term after selection
    }
  };

  // Handle disease prediction
  const handlePredictDisease = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error('Please select at least one symptom.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/predict-disease', {
        symptoms: selectedSymptoms,
      });
      console.log('Prediction Response:', response.data); // Debugging
      setPredictedDiseases(response.data.diseases); // Update to handle array of diseases
      toast.success('Disease predicted successfully!');
    } catch (error) {
      console.error('Error predicting disease:', error);
      toast.error('Failed to predict disease. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch symptoms when the component mounts
  useEffect(() => {
    fetchSymptoms();
  }, []);

  // Handle search for patient details
  const handleSearch = (e) => {
    e.preventDefault();
    fetchPatientDetails();
  };

  // Handle new diagnosis input change
  const handleNewDiagnosisChange = (e) => {
    setNewDiagnosis({ ...newDiagnosis, [e.target.name]: e.target.value });
  };

  // Handle adding a new diagnosis
  const handleAddDiagnosis = async (e) => {
    e.preventDefault();
    if (!newDiagnosis.DiagnosisSummary || !newDiagnosis.DiagnosisDate) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const diagnosisData = {
        PatientID: searchPatientId,
        DiagnosisSummary: newDiagnosis.DiagnosisSummary,
        DiagnosisDate: newDiagnosis.DiagnosisDate,
      };

      await api.post('/diagnoses', diagnosisData);
      toast.success('Diagnosis added successfully!');

      // Refresh patient details
      fetchPatientDetails();

      // Clear the new diagnosis form
      setNewDiagnosis({ DiagnosisSummary: '', DiagnosisDate: '' });
    } catch (error) {
      console.error('Error adding diagnosis:', error);
      toast.error('Failed to add diagnosis. Please try again.');
    }
  };

  // Filter symptoms based on search term
  const filteredSymptoms = symptoms.filter((symptom) =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Diagnosis Management
      </Typography>

      {/* Search Patient by ID */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
        <TextField
          label="Search Patient by ID"
          type="number"
          value={searchPatientId}
          onChange={(e) => setSearchPatientId(e.target.value)}
          required
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>

      {/* Display Loading Spinner */}
      {loading && <Loader />}

      {/* Display Patient Details */}
      {patient && (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Patient Details
          </Typography>
          <Typography><strong>Name:</strong> {patient.Name}</Typography>
          <Typography><strong>Age:</strong> {patient.Age}</Typography>
          <Typography><strong>Gender:</strong> {patient.Gender}</Typography>
          <Typography><strong>Region:</strong> {patient.Region}</Typography>
        </Paper>
      )}

      {/* Symptom Selection and Disease Prediction */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Symptom Selection and Disease Prediction
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Select Symptoms:
          </Typography>
          <Autocomplete
            freeSolo
            options={filteredSymptoms}
            inputValue={searchTerm}
            onInputChange={(event, newValue) => setSearchTerm(newValue)}
            onChange={handleSymptomChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for symptoms"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Box sx={{ mt: 2 }}>
            {selectedSymptoms.map((symptom, index) => (
              <Chip
                key={index}
                label={symptom}
                onDelete={() =>
                  setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
                }
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePredictDisease}
          disabled={selectedSymptoms.length === 0}
        >
          Predict Disease
        </Button>
        {predictedDiseases.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Predicted Diseases:</Typography>
            <List>
              {predictedDiseases.map((disease, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={disease.Name}
                    secondary={disease.Symptoms}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>

      {/* Display Physiological Data */}
      {physiologicalData.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Physiological Data
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Temperature</TableCell>
                <TableCell>Blood Pressure</TableCell>
                <TableCell>Measurement Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {physiologicalData.map((data) => (
                <TableRow key={data.DataID}>
                  <TableCell>{data.Temperature}</TableCell>
                  <TableCell>{data.BloodPressure}</TableCell>
                  <TableCell>{data.MeasurementDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Display Past Diagnoses */}
      {diagnoses.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Past Diagnoses
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Diagnosis Summary</TableCell>
                <TableCell>Diagnosis Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diagnoses.map((diagnosis) => (
                <TableRow key={diagnosis.DiagnosisID}>
                  <TableCell>{diagnosis.DiagnosisSummary}</TableCell>
                  <TableCell>{diagnosis.DiagnosisDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Add New Diagnosis */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add New Diagnosis
        </Typography>
        <Box component="form" onSubmit={handleAddDiagnosis}>
          <TextField
            label="Diagnosis Summary"
            name="DiagnosisSummary"
            value={newDiagnosis.DiagnosisSummary}
            onChange={handleNewDiagnosisChange}
            fullWidth
            multiline
            rows={4}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Diagnosis Date"
            type="date"
            name="DiagnosisDate"
            value={newDiagnosis.DiagnosisDate}
            onChange={handleNewDiagnosisChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Save Diagnosis
          </Button>
        </Box>
      </Paper>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Box>
  );
};

export default DiagnosisList;