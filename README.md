# Health Data Collection and Digitization System

## **Overview**

This project focuses on the collection, digitization, and management of health records for improved health data accessibility and organization. The system targets three regions in Kenya (Kiambu, Nyahururu, Nyeri) and aims to collect demographic, physiological, and diagnosis data from a population of 150 patients. The project serves as part of the requirements for a Bachelor's degree in Computer and Electronics Systems.

## **Objectives**

- **Digitize Health Records:** Streamline the storage and retrieval of patient health data.
- **Data Collection:** Focus on demographic information (age, gender, region), physiological data (body temperature, blood pressure), and diagnosis summaries.
- **Improve Health Records Management:** Enable quick access and analytics for better decision-making.

## **Features**

1. **Data Entry Module:**
   - Collect patient demographics, physiological data, and diagnoses.
   - Validate inputs to ensure data quality.

2. **Data Storage:**
   - Store patient information securely in a relational database.
   - Support efficient queries and updates.

3. **Data Analytics:**
   - Generate statistics such as average temperature and common diagnoses.
   - Provide region-specific insights.

4. **Reporting:**
   - Export data as CSV/Excel.
   - Generate printable PDF summaries for clinics.

## **System Architecture**

The system consists of:

- **Frontend:** A user-friendly interface for data entry and visualization.
- **Backend:** APIs for data validation, processing, and communication.
- **Database:** Relational database for structured and secure data storage.

## **Tech Stack**

- **Frontend:** React.js (or Vue.js/Angular), HTML, CSS, Bootstrap/Tailwind CSS.
- **Backend:** Python (Django/Flask) or Node.js (Express.js).
- **Database:** PostgreSQL or MySQL.
- **Deployment:** Hosted on cloud platforms like AWS, Heroku, or Vercel.

## **Project Structure**

```project/
│
├── frontend/              # Frontend files
│   ├── public/            # Static files
│   ├── src/               # React/Angular/Vue source code
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend-specific documentation
│
├── backend/               # Backend files
│   ├── app/               # Application logic
│   ├── tests/             # Unit and integration tests
│   ├── requirements.txt   # Python backend dependencies
│   └── README.md          # Backend-specific documentation
│
├── database/              # SQL scripts and database schema
│   ├── schema.sql         # Database schema
│   ├── seeds.sql          # Dummy data (optional)
│   └── README.md          # Database-specific documentation
│
├── docs/                  # Project documentation
│   ├── system_overview.md # High-level system overview
│   ├── api_docs.md        # API documentation
│   └── deployment.md      # Deployment instructions
│
├── .gitignore             # Files/folders to ignore
├── README.md              # Overall project description
├── LICENSE                # Project license
└── docker-compose.yml     # Docker configuration for the entire system
```

## **Database overview**

The `healthfasta` database consists of three main tables:

1. **Patients**: Stores patient demographic information.
2. **PhysiologicalData**: Stores physiological measurements such as temperature and blood pressure.
3. **Diagnosis**: Stores diagnosis summaries for patients.

For more detailed information, refer to:

- [Database Schema](./database/DATABASE.md)
- [Entity-Relationship Diagram](./database/docs/ER_DIAGRAM.png)
- [SQL Script](./database/schema.sql)

## **Setup Instructions**

### Prerequisites

- Node.js (for frontend)
- Python 3.9+ (for backend)
- PostgreSQL/MySQL (for database)
- Git (for version control)

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project
   ```

2. Set up the **Frontend**:

   ```bash
   cd frontend
   npm install
   npm start
   ```

3. Set up the **Backend**:

   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py runserver
   ```

4. Set up the **Database**:
   - Import `schema.sql` to your database server.
   - Configure database connection settings in the backend.

5. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`

## **Deployment**

- Use **Vercel/Netlify** for frontend hosting.
- Deploy the backend on **Heroku/AWS**.
- Host the database on **AWS RDS** or **Heroku Postgres**.

## **Contribution Guidelines**

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/<name>
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add feature <name>"
   ```

4. Push to the branch:

   ```bash
   git push origin feature/<name>
   ```

5. Create a pull request.

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

## **Contact**

For inquiries or support, please contact:

- **George Claudio**
- Email: <georgeclaudiofficiel@gmail.com>
