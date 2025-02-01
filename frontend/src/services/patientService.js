import api from './api';

// Fetch all patients
export const getAllPatients = async () => {
    const response = await api.get('/patients');
    return response.data;
};

// Fetch a single patient by ID
export const getPatientById = async (id) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
};

// Add a new patient
export const addPatient = async (patientData) => {
    const response = await api.post('/patients', patientData);
    return response.data;
};

// Edit an existing patient
export const editPatient = async (id, patientData) => {
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
};

// Delete a patient
export const deletePatient = async (id) => {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
};
