import React from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  InputLabel,
  Divider,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

const PatientForm = ({
  profileData,
  handleInputChange,
  handleFormSubmit,
  patientData,
}) => {
  if (patientData.new_patient) {
    return (
      <div className="my-5 flex flex-col justify-center">
        <div className="flex justify-center">
          <h2 className="m-2 heading p-6 w-4/5 text-3xl text-gray-800">
            Empowering Your Health Journey
          </h2>
        </div>
        <Container>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="age"
                  label="Age"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={profileData.age}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label">Sex</InputLabel>
                  <Select
                    required
                    name="sex"
                    labelId="dropdown-label"
                    value={profileData.sex}
                    onChange={handleInputChange}
                    label="Sex"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="text"
                  name="first_name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={profileData.first_name}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="last_name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={profileData.last_name}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel sx={{ fontSize: "1.05rem", pl: "8px" }}>
                  Date of Birth
                </InputLabel>
                <Divider sx={{ my: 0.5 }} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="dob_day"
                  type="text"
                  label="Day"
                  variant="outlined"
                  fullWidth
                  value={profileData.dob_day}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  name="dob_month"
                  label="Month"
                  variant="outlined"
                  fullWidth
                  value={profileData.dob_month}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  name="dob_year"
                  label="Year"
                  variant="outlined"
                  fullWidth
                  value={profileData.dob_year}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="height"
                  label="Height"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={profileData.height}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="weight"
                  label="Weight"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={profileData.weight}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="current_med"
                  label="Current Medications (separated by commas)"
                  variant="outlined"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  value={profileData.current_med}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="medical_history"
                  label="Medical History (separated by commas)"
                  variant="outlined"
                  fullWidth
                  type="text"
                  multiline
                  rows={4}
                  value={profileData.medical_history}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label">Exercise</InputLabel>
                  <Select
                    labelId="dropdown-label"
                    value={profileData.exercise}
                    onChange={handleInputChange}
                    name="exercise"
                    label="Exercise"
                  >
                    <MenuItem value="Yoga">Yoga</MenuItem>
                    <MenuItem value="Mild">
                      Mild-Exercises - Walks, Jogs
                    </MenuItem>
                    <MenuItem value="Heavy">
                      Heavy-Exercises - Running, Lifting
                    </MenuItem>
                    <MenuItem value="No">No Exercise</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label">Diet</InputLabel>
                  <Select
                    labelId="dropdown-label"
                    value={profileData.diet}
                    onChange={handleInputChange}
                    name="diet"
                    label="Diet"
                  >
                    <MenuItem value="Vegan">Vegan</MenuItem>
                    <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                    <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" required>
                    Alcohol Consumption
                  </InputLabel>
                  <Select
                    required
                    name="alcohol_cons"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={profileData.alcohol_cons}
                    label="Alcoholic Consumption"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"No"}>No</MenuItem>
                    <MenuItem value={"Mild"}>Mild</MenuItem>
                    <MenuItem value={"high"}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" required>
                    Smoking Consumption
                  </InputLabel>
                  <Select
                    name="smoke_cons"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={profileData.smoke_cons}
                    label="Smoking Consumption"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"No"}>No</MenuItem>
                    <MenuItem value={"Mild"}>Mild</MenuItem>
                    <MenuItem value={"high"}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <div className="buttonContainer mt-5 w-full">
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className="w-1/6 h-12"
              >
                Submit
              </Button>
            </div>
          </form>
        </Container>
      </div>
    );
  }
  return null;
};

export default PatientForm;
