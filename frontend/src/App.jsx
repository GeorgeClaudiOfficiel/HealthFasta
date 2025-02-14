import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientsList from './pages/Patients/PatientsList';
import AddPatient from './pages/Patients/AddPatient';
import EditPatient from './pages/Patients/EditPatient';
import ReportsList from './pages/Reports/ReportsList';
import AddReport from './pages/Reports/AddReport';
import DiagnosisList from './pages/Diagnosis/DiagnosisList';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token')); // Authentication check
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/patients/add" element={<AddPatient />} />
          <Route path="/patients/edit/:id" element={<EditPatient />} />
          <Route path="/reports" element={<ReportsList />} />
          <Route path="/reports/add" element={<AddReport />} />
          <Route path="/diagnoses" element={<DiagnosisList />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;