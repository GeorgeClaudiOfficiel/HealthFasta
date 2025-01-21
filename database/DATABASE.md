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
