from app import mysql
from MySQLdb.cursors import DictCursor

class PatientModel:
    @staticmethod
    def create(data):
        query = "INSERT INTO patient (Name, Age, Gender, Region) VALUES (%s, %s, %s, %s)"
        values = (data['Name'], data['Age'], data['Gender'], data['Region'])
        cursor = mysql.connection.cursor()
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return True

    @staticmethod
    def read_all():
        query = "SELECT * FROM patient"
        cursor = mysql.connection.cursor(DictCursor)
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
        return results

    @staticmethod
    def read_one(patient_id):
        query = "SELECT * FROM patient WHERE PatientID = %s"
        cursor = mysql.connection.cursor()
        cursor.execute(query, (patient_id,))
        result = cursor.fetchone()
        cursor.close()
        return result

    @staticmethod
    def update(patient_id, data):
        query = "UPDATE patient SET Name = %s, Age = %s, Gender = %s, Region = %s WHERE PatientID = %s"
        values = (data['Name'], data['Age'], data['Gender'], data['Region'], patient_id)
        cursor = mysql.connection.cursor()
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return True

    @staticmethod
    def delete(patient_id):
        query = "DELETE FROM patient WHERE PatientID = %s"
        cursor = mysql.connection.cursor()
        cursor.execute(query, (patient_id,))
        mysql.connection.commit()
        cursor.close()
        return True


class PhysiologicalDataModel:
    @staticmethod
    def create(data):
        query = """INSERT INTO physiologicaldata 
                   (PatientID, Temperature, BloodPressure, MeasurementDate) 
                   VALUES (%s, %s, %s, %s)"""
        values = (data['PatientID'], data['Temperature'], data['BloodPressure'], data['MeasurementDate'])
        cursor = mysql.connection.cursor()
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return True

    @staticmethod
    def read_all():
        query = "SELECT * FROM physiologicaldata"
        cursor = mysql.connection.cursor(DictCursor)
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
        return results

    @staticmethod
    def read_one(data_id):
        query = "SELECT * FROM physiologicaldata WHERE DataID = %s"
        cursor = mysql.connection.cursor()
        cursor.execute(query, (data_id,))
        result = cursor.fetchone()
        cursor.close()
        return result

    @staticmethod
    def update(data_id, data):
        query = """UPDATE physiologicaldata 
                   SET PatientID = %s, Temperature = %s, BloodPressure = %s, MeasurementDate = %s 
                   WHERE DataID = %s"""
        values = (data['PatientID'], data['Temperature'], data['BloodPressure'], data['MeasurementDate'], data_id)
        cursor = mysql.connection.cursor()
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return True

    @staticmethod
    def delete(data_id):
        query = "DELETE FROM physiologicaldata WHERE DataID = %s"
        cursor = mysql.connection.cursor()
        cursor.execute(query, (data_id,))
        mysql.connection.commit()
        cursor.close()
        return True


class DiagnosisModel:
    @staticmethod
    def create(data):
        query = """INSERT INTO diagnosis 
                   (PatientID, DiagnosisSummary, DiagnosisDate) 
                   VALUES (%s, %s, %s)"""
        values = (data['PatientID'], data['DiagnosisSummary'], data['DiagnosisDate'])
        cursor = mysql.connection.cursor()
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return True

    @staticmethod
    def read_all():
        query = "SELECT * FROM diagnosis"
        cursor = mysql.connection.cursor(DictCursor)
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
        return results

    @staticmethod
    def read_one(diagnosis_id):
        query = "SELECT * FROM diagnosis WHERE DiagnosisID = %s"
        cursor = mysql.connection.cursor()
        cursor.execute(query, (diagnosis_id,))
        result = cursor.fetchone()
        cursor.close()
        return result

    @staticmethod
    def update(diagnosis_id, data):
        query = """UPDATE diagnosis 
                   SET PatientID = %s, DiagnosisSummary = %s, DiagnosisDate = %s 
                   WHERE DiagnosisID = %s"""
        values = (data['PatientID'], data['DiagnosisSummary'], data['DiagnosisDate'], diagnosis_id)
        cursor = mysql.connection.cursor()
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return True

    @staticmethod
    def delete(diagnosis_id):
        query = "DELETE FROM diagnosis WHERE DiagnosisID = %s"
        cursor = mysql.connection.cursor()
        cursor.execute(query, (diagnosis_id,))
        mysql.connection.commit()
        cursor.close()
        return True


class UsersModel:
    @staticmethod
    def create(data):
        query = "INSERT INTO users (Username, Password) VALUES (%s, %s)"
        values = (data['Username'], data['Password'])
        cursor = mysql.connection.cursor()
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return True

    @staticmethod
    def read_all():
        query = "SELECT * FROM users"
        cursor = mysql.connection.cursor(DictCursor)
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
        return results

    @staticmethod
    def read_one(user_id):
        query = "SELECT * FROM users WHERE UserID = %s"
        cursor = mysql.connection.cursor(DictCursor)
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        cursor.close()
        return result

    @staticmethod
    def read_by_username(username):
        query = "SELECT * FROM users WHERE Username = %s"
        cursor = mysql.connection.cursor(DictCursor)
        cursor.execute(query, (username,))
        result = cursor.fetchone()
        cursor.close()
        return result

    @staticmethod
    def update(user_id, data):
        query = "UPDATE users SET Username = %s, Password = %s WHERE UserID = %s"
        values = (data['Username'], data['Password'], user_id)
        cursor = mysql.connection.cursor()
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return True

    @staticmethod
    def delete(user_id):
        query = "DELETE FROM users WHERE UserID = %s"
        cursor = mysql.connection.cursor()
        cursor.execute(query, (user_id,))
        mysql.connection.commit()
        cursor.close()
        return True
