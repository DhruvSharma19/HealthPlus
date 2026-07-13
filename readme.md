# HealthPlus

This project is a Django-based web application designed to manage user accounts, patient profiles, doctor profiles, and track disease symptoms. It features a robust backend for handling user authentication, data serialization, and custom validations. The frontend is built with modern JavaScript frameworks and libraries to create a responsive and user-friendly interface.

**Test User:** testUser@gmail.com  
**Password:** 12345678

**Website Link:**  [HealthPlus]()

## Demo Video

## System Diagrams

![diagram (1)](https://github.com/DhruvSharma19/HealthPlus/assets/112254552/68a96c11-ff06-4e9c-ae14-42831c3ec09d)
![diagram](https://github.com/DhruvSharma19/HealthPlus/assets/112254552/0cdb1b03-890e-4e75-b005-25cb582f0da4)
![Screenshot_4-6-2024_164214_diagrams helpful dev](https://github.com/DhruvSharma19/HealthPlus/assets/112254552/fb00f949-b98e-47dc-aeac-9f887ff0cb8f)

## Key Features

- **User Management**: Register, login, logout, and view user details. 
- **Patient Profiles**: Create, retrieve, and update patient information. 
- **Doctor Profiles**: List doctor profiles with details. 
- **Symptom Tracking**: Store and manage symptoms and related diseases. 
- **Custom Validations**: Ensure data integrity with custom validation functions. 

## Technologies Used

### Backend
- **Django**: Web framework for building the backend. 
- **Django REST Framework**: For creating RESTful APIs.
- **PostgreSQL**: Database for storing application data. 
- **NumPy & Pandas**: Data manipulation and analysis. 
- **Scikit-Learn & Imbalanced-Learn**: Machine learning libraries for disease prediction. 
- **Python Decouple & Dotenv**: For environment variable management. 
- **Django CORS Headers**: For handling CORS. 

### Frontend
- **React**: JavaScript library for building user interfaces. 
- **Vite**: Frontend tooling for fast development and building. 
- **MUI**: Material-UI components for React. 
- **React Router DOM**: Routing library for React. 
- **Axios**: Promise-based HTTP client. 
- **Chart.js & React-Chartjs-2**: For data visualization. 
- **Bootstrap & React-Bootstrap**: For responsive design. 
- **UUID**: For generating unique identifiers. 
- **TailwindCSS**: Utility-first CSS framework. 

## Screenshots

Sure, here is an improved version of the setup instructions:

## Getting Started 

### Project Setup Instructions

#### Setup PostgreSQL Database and .env File

1. **Setup your PostgreSQL database and create a .env file:**
   - Create a file named `.env` in your project's root directory.
   - Add the following lines to the `.env` file, replacing the placeholders with your actual database credentials:

     ```env
     USER=<Postgres_Username>
     DATABASE_NAME=<Database_Name>
     DATABASE_PASS=<Database_Password>
     ```

#### Install Python Dependencies

2. **Install the required Python dependencies:**
   Run the following command in your terminal:

   ```bash
   pip install -r requirements.txt
   ```

#### Database Migrations

3. **Create database migration files based on your Django models:**
   Run the following command:

   ```bash
   python manage.py makemigrations
   ```

4. **Apply the migrations to create the necessary tables in the database:**
   Run the following command:

   ```bash
   python manage.py migrate
   ```

#### Frontend Setup

5. **Navigate to the frontend folder:**
   Change directory by running:

   ```bash
   cd frontend
   ```

6. **Install the required frontend dependencies:**
   Run the following command:

   ```bash
   npm install
   ```

## Contributions

We welcome contributions to FlowLink! To contribute:

1. **Fork the Repository**:
   Click the "Fork" button at the top right corner of the repository page.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/HealthPlus.git
   cd FlowLink
   ```

3. **Create a New Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**:
   Implement your feature or fix the bug.

5. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "Add your commit message here"
   ```

6. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**:
   Open a pull request from your forked repository's branch to the main branch of the original repository.

We appreciate your contributions and will review your pull request as soon as possible!

## Acknowledgements

A big thank you to everyone who contributed to this project! We appreciate your support and feedback.

If you have any questions or need assistance, feel free to open an issue or reach out to the project maintainers. Enjoy using HealthPlus and happy coding!

