## 🎥 Demo Video

## 🛠️ System Diagrams

![diagram (1)](https://github.com/DhruvSharma19/HealthPlus/assets/112254552/68a96c11-ff06-4e9c-ae14-42831c3ec09d)
![diagram](https://github.com/DhruvSharma19/HealthPlus/assets/112254552/0cdb1b03-890e-4e75-b005-25cb582f0da4)
![Screenshot_4-6-2024_164214_diagrams helpful dev](https://github.com/DhruvSharma19/HealthPlus/assets/112254552/fb00f949-b98e-47dc-aeac-9f887ff0cb8f)

## 🌟 Key Features



## 🛠 Technologies Used



## 🖼️ Screenshots

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


