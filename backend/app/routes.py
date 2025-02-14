from flask import Blueprint, request, jsonify
# from werkzeug.security import check_password_hash
import jwt
import datetime
from app.models import PatientModel, PhysiologicalDataModel, DiagnosisModel, UsersModel, DiseaseSymptomsModel
from config import Config  # Add this to your `config.py`
from MySQLdb.cursors import DictCursor
from app import mysql


routes = Blueprint("routes", __name__)

# Helper function for token generation
def generate_token(user_id, username):
    payload = {
        "user_id": user_id,
        "username": username, # Include the username in the token
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)  # Token valid for 1 hour
    }
    token = jwt.encode(payload, Config.SECRET_KEY, algorithm="HS256")
    return token


# User login
@routes.route("/auth/login", methods=["POST"])
def login():
    data = request.json
    print("Received data:", data)
    
    username = data.get("Username")
    password = data.get("Password")
    
    print("Username:", username)  # Print username
    print("Password:", password)  # Print password (not recommended in production)


    if not username or not password:
        print("Error: Username or password missing")  # Print error if missing
        return jsonify({"error": "Username and password are required"}), 400

    user = UsersModel.read_by_username(username)
    print("Queried user:", user)  # Print user object from the database
    if user:
        if user["Password"] == password:
            print("Password matched")  # Print the result of password hash comparison
            token = generate_token(user["UserID"], user["Username"])
            return jsonify({"message": "Login successful", "token": token}), 200
    print("Invalid credentials")
    return jsonify({"error": "Invalid username or password"}), 401


# User logout (dummy endpoint for frontend)
@routes.route("/logout", methods=["POST"])
def logout():
    return jsonify({"message": "User logged out successfully"}), 200


# Patient routes
@routes.route("/patients", methods=["GET"])
def get_all_patients():
    patients = PatientModel.read_all()
    return jsonify(patients), 200

@routes.route("/patients/<int:patient_id>", methods=["GET"])
def get_patient(patient_id):
    patient = PatientModel.read_one(patient_id)
    if patient:
        return jsonify(patient), 200
    return jsonify({"error": "Patient not found"}), 404

@routes.route("/patients", methods=["POST"])
def create_patient():
    data = request.json
    PatientModel.create(data)
    return jsonify({"message": "Patient created successfully"}), 201

@routes.route("/patients/<int:patient_id>", methods=["PUT"])
def update_patient(patient_id):
    data = request.json
    PatientModel.update(patient_id, data)
    return jsonify({"message": "Patient updated successfully"}), 200

@routes.route("/patients/<int:patient_id>", methods=["DELETE"])
def delete_patient(patient_id):
    PatientModel.delete(patient_id)
    return jsonify({"message": "Patient deleted successfully"}), 200


# Physiological data routes
@routes.route("/physiological-data", methods=["GET"])
def get_all_physiological_data():
    data = PhysiologicalDataModel.read_all()
    return jsonify(data), 200

@routes.route("/physiological-data/<int:data_id>", methods=["GET"])
def get_physiological_data(data_id):
    data = PhysiologicalDataModel.read_one(data_id)
    if data:
        return jsonify(data), 200
    return jsonify({"error": "Physiological data not found"}), 404

@routes.route("/physiological-data", methods=["POST"])
def create_physiological_data():
    data = request.json
    PhysiologicalDataModel.create(data)
    return jsonify({"message": "Physiological data created successfully"}), 201

@routes.route("/physiological-data/<int:data_id>", methods=["PUT"])
def update_physiological_data(data_id):
    data = request.json
    PhysiologicalDataModel.update(data_id, data)
    return jsonify({"message": "Physiological data updated successfully"}), 200

@routes.route("/physiological-data/<int:data_id>", methods=["DELETE"])
def delete_physiological_data(data_id):
    PhysiologicalDataModel.delete(data_id)
    return jsonify({"message": "Physiological data deleted successfully"}), 200


# Diagnosis routes
@routes.route("/diagnoses", methods=["GET"])
def get_all_diagnoses():
    diagnoses = DiagnosisModel.read_all()
    return jsonify(diagnoses), 200

@routes.route("/diagnoses/<int:diagnosis_id>", methods=["GET"])
def get_diagnosis(diagnosis_id):
    diagnosis = DiagnosisModel.read_one(diagnosis_id)
    if diagnosis:
        return jsonify(diagnosis), 200
    return jsonify({"error": "Diagnosis not found"}), 404

@routes.route("/diagnoses", methods=["POST"])
def create_diagnosis():
    data = request.json
    DiagnosisModel.create(data)
    return jsonify({"message": "Diagnosis created successfully"}), 201

@routes.route("/diagnoses/<int:diagnosis_id>", methods=["PUT"])
def update_diagnosis(diagnosis_id):
    data = request.json
    DiagnosisModel.update(diagnosis_id, data)
    return jsonify({"message": "Diagnosis updated successfully"}), 200

@routes.route("/diagnoses/<int:diagnosis_id>", methods=["DELETE"])
def delete_diagnosis(diagnosis_id):
    DiagnosisModel.delete(diagnosis_id)
    return jsonify({"message": "Diagnosis deleted successfully"}), 200


# User routes
@routes.route("/users", methods=["GET"])
def get_all_users():
    users = UsersModel.read_all()
    return jsonify(users), 200

@routes.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = UsersModel.read_one(user_id)
    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

@routes.route("/users", methods=["POST"])
def create_user():
    data = request.json
    UsersModel.create(data)
    return jsonify({"message": "User created successfully"}), 201

@routes.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.json
    UsersModel.update(user_id, data)
    return jsonify({"message": "User updated successfully"}), 200

@routes.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    UsersModel.delete(user_id)
    return jsonify({"message": "User deleted successfully"}), 200

# Endpoint for disease prediction
@routes.route("/predict-disease", methods=["POST"])
def predict_disease():
    data = request.json
    symptoms = data.get("symptoms")  # List of symptoms selected by the user

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    # Query the database to find matching diseases
    matching_diseases = DiseaseSymptomsModel.find_diseases_by_symptoms(symptoms)

    if not matching_diseases:
        return jsonify({"error": "No matching diseases found"}), 404

    # Return the list of matching diseases
    return jsonify({"diseases": matching_diseases}), 200

# Endpoint to get symptoms
@routes.route("/symptoms", methods=["GET"])
def get_symptoms():
    query = "SELECT DISTINCT Symptoms FROM disease_symptoms"
    cursor = mysql.connection.cursor(DictCursor)
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()

    # Extract and format symptoms
    symptoms = []
    for row in results:
        symptoms.extend(row["Symptoms"].split(", "))

    # Remove duplicates
    unique_symptoms = list(set(symptoms))
    return jsonify(unique_symptoms), 200