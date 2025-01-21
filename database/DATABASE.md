# Database Documentation

## Database Name: `healthfasta`

### Tables Overview

#### 1. Patients

| Field          | Type        | Null | Key         | Description               |
|----------------|-------------|------|-------------|---------------------------|
| `PatientID`    | INT         | NO   | PRIMARY KEY | Unique identifier         |
| `Name`         | VARCHAR(255)| NO   |             | Name of the patient       |
| `Age`          | INT         | NO   |             | Age of the patient        |
| `Gender`       | ENUM('M', 'F')| NO |             | Gender of the patient     |
| `Region`       | VARCHAR(100)| NO   |             | Patient's region          |

#### 2. PhysiologicalData

| Field            | Type        | Null | Key         | Description                       |
|------------------|-------------|------|-------------|-----------------------------------|
| `DataID`         | INT         | NO   | PRIMARY KEY | Unique identifier                |
| `PatientID`      | INT         | NO   | FOREIGN KEY | Links to Patients table          |
| `Temperature`    | FLOAT       | NO   |             | Body temperature (in Celsius)    |
| `BloodPressure`  | VARCHAR(10) | NO   |             | Blood pressure reading (e.g., 120/80) |
| `MeasurementDate`| DATE        | NO   |             | Date of the measurement          |

#### 3. Diagnosis

| Field            | Type        | Null | Key         | Description                       |
|------------------|-------------|------|-------------|-----------------------------------|
| `DiagnosisID`    | INT         | NO   | PRIMARY KEY | Unique identifier                |
| `PatientID`      | INT         | NO   | FOREIGN KEY | Links to Patients table          |
| `DiagnosisSummary`| TEXT       | NO   |             | Summary of the diagnosis          |
| `DiagnosisDate`  | DATE        | NO   |             | Date of the diagnosis            |

### Relationships

- `Patients.PatientID` → `PhysiologicalData.PatientID` (One-to-Many)
- `Patients.PatientID` → `Diagnosis.PatientID` (One-to-Many)

## Data Files

The `data/` folder contains sample data files used to populate the `healthfasta` database for testing and development purposes.

### CSV Files

1. **Patients.csv**: Contains demographic information of patients.
    - Fields: `PatientID`, `Name`, `Age`, `Gender`, `Region`
2. **PhysiologicalData.csv**: Contains physiological measurements.
    - Fields: `DataID`, `PatientID`, `Temperature`, `BloodPressure`, `MeasurementDate`
3. **Diagnosis.csv**: Contains diagnosis information.
    - Fields: `DiagnosisID`, `PatientID`, `DiagnosisSummary`, `DiagnosisDate`

### How to Use

1. Import the CSV files into the `healthfasta` database using MySQL Workbench or a command-line tool.
2. Ensure the database tables are created first by running the SQL schema script (`HealthFasta_SQL_script.sql`).
3. Load the data in the following order:
    - `Patients.csv` (First table to populate)
    - `PhysiologicalData.csv`
    - `Diagnosis.csv`
