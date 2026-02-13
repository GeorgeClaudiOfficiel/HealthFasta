# Use Python
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# --- NEW SECTION STARTS HERE ---
# Install system dependencies required for mysqlclient
RUN apt-get update && apt-get install -y \
    pkg-config \
    build-essential \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*
# --- NEW SECTION ENDS HERE ---

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Expose the port Flask runs on
EXPOSE 5000

# Command to run the app
CMD ["python", "run.py"]