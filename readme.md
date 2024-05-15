# Project Setup Instructions

## Setup PostgreSQL Database and .env File

1. Setup your PostgreSQL database and create a .env file:
   - Create a file called `.env` in your project's root directory.
   - Add the following lines to the `.env` file, replacing the placeholders with your actual database credentials:

     ```
     USER = <Postgres_Username>
     DATABASE_NAME = <Database_Name>
     DATABASE_PASS = <Database_Password>
     ```

## Install Python Dependencies

2. Run the following command to install the required Python dependencies:

pip install -r requirements.txt

## Database Migrations

3. Run the following command to create database migration files based on your Django models:

python manage.py makemigrations

4. Run the following command to apply the migrations and create the necessary tables in the database:

python manage.py migrate

## Frontend Setup

5. Change directory to the frontend folder:

cd frontend

6. Run the following command to install the required frontend dependencies:

npm install


