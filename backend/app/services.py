from werkzeug.security import generate_password_hash, check_password_hash
from flask_mysqldb import MySQL
from app.utils import generate_token, verify_token
from app.models import PatientModel, PhysiologicalDataModel, DiagnosisModel, UsersModel
from flask import jsonify, make_response


class PatientService:
    @staticmethod
    def create(data):
        if 'Name' not in data or 'Age' not in data or 'Gender' not in data or 'Region' not in data:
            return make_response(jsonify({"error": "Missing required patient fields"}), 400)

        if PatientModel.create(data):
            return make_response(jsonify({"message": "Patient created successfully!"}), 201)
        return make_response(jsonify({"error": "Failed to create patient"}), 500)

    @staticmethod
    def read_all():
        patients = PatientModel.read_all()
        return make_response(jsonify(patients), 200)

    @staticmethod
    def read_one(patient_id):
        patient = PatientModel.read_one(patient_id)
        if patient:
            return make_response(jsonify(patient), 200)
        return make_response(jsonify({"error": "Patient not found"}), 404)

    @staticmethod
    def update(patient_id, data):
        if 'Name' not in data or 'Age' not in data or 'Gender' not in data or 'Region' not in data:
            return make_response(jsonify({"error": "Missing required fields"}), 400)

        if PatientModel.update(patient_id, data):
            return make_response(jsonify({"message": "Patient updated successfully!"}), 200)
        return make_response(jsonify({"error": "Failed to update patient"}), 500)

    @staticmethod
    def delete(patient_id):
        if PatientModel.delete(patient_id):
            return make_response(jsonify({"message": "Patient deleted successfully!"}), 200)
        return make_response(jsonify({"error": "Failed to delete patient"}), 500)


class PhysiologicalDataService:
    @staticmethod
    def create(data):
        if 'PatientID' not in data or 'Temperature' not in data or 'BloodPressure' not in data or 'MeasurementDate' not in data:
            return make_response(jsonify({"error": "Missing required physiological data fields"}), 400)

        if PhysiologicalDataModel.create(data):
            return make_response(jsonify({"message": "Physiological data created successfully!"}), 201)
        return make_response(jsonify({"error": "Failed to create physiological data"}), 500)

    @staticmethod
    def read_all():
        data = PhysiologicalDataModel.read_all()
        return make_response(jsonify(data), 200)

    @staticmethod
    def read_one(data_id):
        data = PhysiologicalDataModel.read_one(data_id)
        if data:
            return make_response(jsonify(data), 200)
        return make_response(jsonify({"error": "Physiological data not found"}), 404)

    @staticmethod
    def update(data_id, data):
        if 'PatientID' not in data or 'Temperature' not in data or 'BloodPressure' not in data or 'MeasurementDate' not in data:
            return make_response(jsonify({"error": "Missing required fields"}), 400)

        if PhysiologicalDataModel.update(data_id, data):
            return make_response(jsonify({"message": "Physiological data updated successfully!"}), 200)
        return make_response(jsonify({"error": "Failed to update physiological data"}), 500)

    @staticmethod
    def delete(data_id):
        if PhysiologicalDataModel.delete(data_id):
            return make_response(jsonify({"message": "Physiological data deleted successfully!"}), 200)
        return make_response(jsonify({"error": "Failed to delete physiological data"}), 500)


class DiagnosisService:
    @staticmethod
    def create(data):
        if 'PatientID' not in data or 'DiagnosisSummary' not in data or 'DiagnosisDate' not in data:
            return make_response(jsonify({"error": "Missing required diagnosis fields"}), 400)

        if DiagnosisModel.create(data):
            return make_response(jsonify({"message": "Diagnosis created successfully!"}), 201)
        return make_response(jsonify({"error": "Failed to create diagnosis"}), 500)

    @staticmethod
    def read_all():
        diagnoses = DiagnosisModel.read_all()
        return make_response(jsonify(diagnoses), 200)

    @staticmethod
    def read_one(diagnosis_id):
        diagnosis = DiagnosisModel.read_one(diagnosis_id)
        if diagnosis:
            return make_response(jsonify(diagnosis), 200)
        return make_response(jsonify({"error": "Diagnosis not found"}), 404)

    @staticmethod
    def update(diagnosis_id, data):
        if 'PatientID' not in data or 'DiagnosisSummary' not in data or 'DiagnosisDate' not in data:
            return make_response(jsonify({"error": "Missing required fields"}), 400)

        if DiagnosisModel.update(diagnosis_id, data):
            return make_response(jsonify({"message": "Diagnosis updated successfully!"}), 200)
        return make_response(jsonify({"error": "Failed to update diagnosis"}), 500)

    @staticmethod
    def delete(diagnosis_id):
        if DiagnosisModel.delete(diagnosis_id):
            return make_response(jsonify({"message": "Diagnosis deleted successfully!"}), 200)
        return make_response(jsonify({"error": "Failed to delete diagnosis"}), 500)


class AuthService:
    @staticmethod
    def register(username, password):
        try:
            hashed_password = generate_password_hash(password)
            if UsersModel.create({"Username": username, "Password": hashed_password}):
                return {"message": "User registered successfully!"}, 201
            return {"error": "Failed to register user"}, 500
        except Exception as e:
            return {"error": f"An error occurred: {str(e)}"}, 500

    @staticmethod
    def login(username, password):
        user = UsersModel.read_by_username(username)
        if not user or not check_password_hash(user['Password'], password):
            return {"error": "Invalid username or password"}, 401

        token = generate_token(user['UserID'])
        return {"message": "Login successful!", "token": token}, 200

    @staticmethod
    def logout():
        return {"message": "User logged out successfully!"}, 200
