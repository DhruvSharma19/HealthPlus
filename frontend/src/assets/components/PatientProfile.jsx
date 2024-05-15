import Calendar from "./Calendar";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import Record from "./Record";
import BP_chart from "./BP_chart";
import LogModal from "./LogModal";
import BP_Log from "./BP_Log";
import ProfileModal from "./ProfileModal";
import GlucoseLevel from "./GlucoseLevel";
import Sugar_chart from "./Sugar_chart";
import Personal from "./Personal";
import MedicalHistory from "./Medical History";
import ConsumptionModal from "./ConsumptionModal";

const PatientProfile = ({ responseData }) => {
  const [record, setRecord] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [consumptionModal, setConsumptionModal] = useState(false);
  const { first_name, height, weight, last_name } = responseData;
  const [bmi, setBmi] = useState(0);
  const [bmiColor, setBmiColor] = useState("");

  useEffect(() => {
    // Calculate BMI
    const calculateBMI = () => {
      const heightInMeters = height / 100; // Convert height to meters
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue);

      // Set BMI color
      if (bmiValue < 18.5) {
        setBmiColor("bg-purple-400");
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBmiColor("bg-blue-400");
      } else if (bmiValue >= 24.9 && bmiValue < 29.9) {
        setBmiColor("bg-orange-400");
      } else {
        setBmiColor("bg-red-500");
      }
    };

    calculateBMI();
  }, [height, weight]);

  if (responseData.new_patient) {
    return null;
  }

  return (
    <div className="profile flex justify-center flex-col items-center pb-4">
      {Object.keys(responseData).length > 0 ? (
        <>
          <div className="w-full flex flex-wrap justify-center gap-2">
            <div className="bg-gray-800 w-5/6 md:p-2 sm:w-1/6 lg:w-1/12 h-full scale-90 sm:scale-100 sm:h-screen rounded-md">
              <Sidebar
                setRecord={setRecord}
                setLogModal={setLogModal}
                setProfileModal={setProfileModal}
                setConsumptionModal={setConsumptionModal}
              />
            </div>
            <div className="sm:h-screen md:fit-content w-5/6 sm:w-3/4 lg:w-2/5 bg-white  flex flex-col justify-start items-center">
              <div className="md:pt-6 h-40 w-full p-1 justify-between flex items-center greeting px-3 md:px-8">
                <div className="w-full md:w-1/2  md:block text-2xl md:text-3xl font-semibold text-gray-800 ">
                  <p>Hi, {first_name + " " + last_name}</p>
                  <p>Check your</p>
                  <p>Health!</p>
                </div>
                <div className="flex items-center justify-between h-14 md:h-fit xl:w-1/4 gap-3 bg-gray-100 rounded-2xl py-2 px-3 ">
                  <p className="text-lg md:text-xl font-semibold text-gray-900">
                    BMI
                  </p>
                  <div
                    className={`bmi w-12 h-10 md:w-16 md:h-12 rounded-full flex items-center justify-center text-white text-lg md:text-xl font-semibold ${bmiColor}`}
                  >
                    {bmi.toFixed(1)}
                  </div>
                </div>
              </div>
              <div className="charts-container w-full rounded-md flex justify-between sm:px-4 flex-wrap h-96 sm:h-1/3 py-2">
                <div className="w-full sm:w-47 rounded-md ">
                  <BP_chart chartData={responseData.bp_log} />
                </div>
                <div className="w-full  sm:w-47 rounded-md">
                  <Sugar_chart chartData={responseData.blood_glucose} />
                </div>
              </div>
              <div className=" my-2 w-full sm:h-96 md:h-1/2 rounded-md overflow-scroll bg-white border">
                <Personal responseData={responseData} />
              </div>
            </div>
            <div className="sm:w-full lg:px-0 lg:w-1/2 gap-2 p-1  flex flex-col items-center">
              <div className="w-full flex flex-wrap lg:flex-nowrap justify-center">
                <div className="flex w-5/6 sm:w-3/5 md:w-1/2 border  rounded-md">
                  <Calendar />
                </div>

                <div className="w-5/6 bg-gray-50 mt-2 sm:mt-0 sm:w-2/5 md:w-47 lg:mx-2 h-96 sm:h-full border  rounded-md">
                  <MedicalHistory data={responseData.medical_history} />
                </div>
              </div>
              <div className="lg:h-full justify-center w-full flex-wrap sm:flex-nowrap flex gap-2">
                <div className="w-5/6 h-96 md:w-1/2 lg:h-full rounded-md overflow-scroll m-1  border  p-1 flex flex-col">
                  <h2 className="font-semibold text-lg md:text-2xl py-1 text-teal-900 text-center">
                    Glucose
                  </h2>
                  <div className="flex-grow bg-gray-50 ">
                    <GlucoseLevel responseData={responseData} />
                  </div>
                </div>
                <div className="w-5/6  h-96 md:w-1/2 lg:h-full rounded-md overflow-scroll  border  m-1 p-1 flex flex-col">
                  <h2 className="font-semibold text-lg md:text-2xl text-gray-900 text-center p-2 ">
                    Blood Pressure
                  </h2>
                  <div className="flex-grow bg-gray-50">
                    <BP_Log responseData={responseData} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Record setRecord={setRecord} record={record} />
          <LogModal setLogModal={setLogModal} logModal={logModal} />
          <ProfileModal
            setProfileModal={setProfileModal}
            profileModal={profileModal}
          />
          <ConsumptionModal
            consumptionModal={consumptionModal}
            setConsumptionModal={setConsumptionModal}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientProfile;
