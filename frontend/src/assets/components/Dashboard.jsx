import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";
import PatientProfile from "./PatientProfile";
import { useGlobalContext } from "./context";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const Dashboard = () => {
  const { handleInputChange, formData, handleFormSubmit, data, fetchData } =
    useGlobalContext();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-24">
      <PatientForm
        profileData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        patientData={data}
      />
      <PatientProfile responseData={data} />
    </div>
  );
};

export default Dashboard;
