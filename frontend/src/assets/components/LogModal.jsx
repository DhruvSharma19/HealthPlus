import React, { useEffect, useRef } from "react";
import crossIcon from "../img/cross icon.svg";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";

import { useGlobalContext } from "./context";

const LogModal = ({ logModal, setLogModal }) => {
  const { formData, fetchData, setFormData, url, data, setData } =
    useGlobalContext();
  const afterRef = useRef("");
  const beforeRef = useRef("");
  const highRef = useRef("");
  const lowRef = useRef("");
  const dateRef = useRef("");

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substr(-2);
    const month = currentDate.toLocaleString("default", { month: "short" });
    const day = currentDate.getDate();

    const dateString = `${day} ${month} '${year}`;

    dateRef.current = dateString;
  }, []);

  const closeLogModal = () => {
    setLogModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setData((data) => {
      const updatedFormData = { ...data };

      // Append form values and date to bp_log
      const highValue = highRef.current.value;
      const lowValue = lowRef.current.value;
      const dateValue = dateRef.current;

      if (highValue !== "" && lowValue !== "") {
        updatedFormData.bp_log.high.push(highValue);
        updatedFormData.bp_log.low.push(lowValue);
        updatedFormData.bp_log.date.push(dateValue);
      }

      // Append form values and date to blood_glucose
      const beforeValue = beforeRef.current.value;
      const afterValue = afterRef.current.value;

      if (beforeValue !== "" && afterValue !== "") {
        updatedFormData.blood_glucose.before.push(beforeValue);
        updatedFormData.blood_glucose.after.push(afterValue);
        updatedFormData.blood_glucose.date.push(dateValue);
      }

      return updatedFormData;
    });

    try {
      await axios.put(url, data, {
        withCredentials: true,
      });

      await fetchData();
    } catch (error) {
      console.log(error);
    }

    closeLogModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeLogModal();
      }
    };

    if (logModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [logModal]);

  if (!logModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center p-4 backdrop-blur-sm modal">
      <div className="flex flex-col gap-2 items-center w-96 sm:w-1/3  flex-wrap  bg-white rounded-lg shadow-lg p-8">
        <div className="w-full flex justify-end">
          <button onClick={closeLogModal} className="hover:scale-105">
            <img src={crossIcon} alt="cross-icon" loading="lazy" />
          </button>
        </div>
        <h1 className="text-3xl  mt-4 font-semibold text-gray-700">
          MEDICAL LOG
        </h1>
        <form
          className="w-full flex flex-col gap-4 items-center"
          onSubmit={handleSubmit}
        >
          <h2 className="p-1 text-lg text-teal-600 font-semibold">
            {dateRef.current}
          </h2>
          <h3 className="w-full text-xl font-semibold text-gray-600 px-1">
            Blood Pressure Level
          </h3>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                name="high"
                label="High"
                inputRef={highRef}
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="low"
                label="Low"
                inputRef={lowRef}
                type="number"
              />
            </Grid>
          </Grid>
          <h3 className="w-full text-xl font-semibold text-gray-600 px-1">
            Glucose Level
          </h3>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                name="before"
                label="Before Breakfast"
                inputRef={beforeRef}
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="after"
                label="After Breakfast"
                inputRef={afterRef}
                type="number"
              />
            </Grid>
          </Grid>
          <Button variant="outlined" color="success" type="submit">
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogModal;
