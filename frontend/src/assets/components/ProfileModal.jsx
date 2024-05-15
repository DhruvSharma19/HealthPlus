import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useGlobalContext } from "./context";

const ProfileModal = ({ profileModal, setProfileModal }) => {
  const { handleDashboardChange, data, handleDashboardSubmit } =
    useGlobalContext();
  const closeModal = () => {
    setProfileModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeModal();
      }
    };

    if (profileModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileModal]);

  if (!profileModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen  flex justify-center items-center p-4 backdrop-blur-sm modal">
      <div className="flex flex-col justify-center items-center w-96 md:w-1/2 lg:w-2/5  flex-wrap  bg-white rounded-lg shadow-lg px-8 py-8">
        <div className="w-full flex justify-end">
          <button onClick={closeModal} className="hover:scale-105">
            <img src={crossIcon} alt="cross-icon" loading="lazy" />
          </button>
        </div>
        <h1 className="text-3xl pb-6 font-semibold text-gray-700 w-full">
          Edit Profile
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDashboardSubmit(e);
            closeModal();
          }}
          className="w-full flex flex-col gap-4 items-center"
        >
          <Grid container spacing={2}>
            <Grid item xs={6} className="w-full">
              <TextField
                name="first_name"
                label="First Name"
                fullWidth
                value={data.first_name}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="last_name"
                label="Last Name"
                fullWidth
                value={data.last_name}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={6} className="w-full">
              <TextField
                name="age"
                label="Age"
                fullWidth
                type="number"
                value={data.age}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                name="sex"
                value={data.sex}
                onChange={handleDashboardChange}
                fullWidth
              >
                <MenuItem value="Male">Male</MenuItem>

                <MenuItem value="Female">Female</MenuItem>

                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="height"
                label="Height (cm)"
                fullWidth
                type="number"
                value={data.height}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="weight"
                label="Weight (Kg)"
                fullWidth
                type="number"
                value={data.weight}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="dob_day"
                label="Day"
                variant="outlined"
                fullWidth
                helperText="Date of Birth"
                type="number"
                value={data.dob_day}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="dob_month"
                label="Month"
                variant="outlined"
                fullWidth
                helperText="Month of Birth"
                type="number"
                value={data.dob_month}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="dob_year"
                label="Year"
                variant="outlined"
                fullWidth
                helperText="Year of Birth"
                type="number"
                value={data.dob_year}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Diet Type</InputLabel>
              <Select
                name="diet"
                value={data.diet}
                onChange={handleDashboardChange}
                fullWidth
              >
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Excercise</InputLabel>
              <Select
                name="exercise"
                value={data.exercise}
                onChange={handleDashboardChange}
                fullWidth
              >
                <MenuItem value="Yoga">Yoga</MenuItem>

                <MenuItem value="Mild Exercises">
                  Mild Excercises - Walks, Jogs
                </MenuItem>

                <MenuItem value="Heavy Exercises">
                  Heavy Excercises - Running, Lifting
                </MenuItem>

                <MenuItem value="No">No Excercise</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            color="primary"
            type="submit"
            className="w-48"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
