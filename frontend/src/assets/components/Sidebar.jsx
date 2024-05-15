import React from "react";
import record from "../img/record.svg";
import profile from "../img/profile.svg";
import settings from "../img/settings.svg";
import consumption from "../img/cons.svg";

const Sidebar = ({
  setRecord,
  setLogModal,
  setProfileModal,
  setConsumptionModal,
}) => {
  const handleRecord = () => {
    setRecord(true);
  };
  const handleLogModal = () => {
    setLogModal(true);
  };
  const handleProfileModal = () => {
    setProfileModal(true);
  };

  const handleConsumptionModal = () => {
    setConsumptionModal(true);
  };

  return (
    <div className="flex sm:flex-col justify-center items-center gap-5 m-1 sm:mt-10">
      <button
        onClick={handleProfileModal}
        className="w-10 h-10 p-1 hover:scale-90 hover:cursor-pointer hover:bg-teal-600 rounded-full duration-200 transition-all"
      >
        <img src={profile} alt="" className="w-full" />
      </button>
      <button
        onClick={handleRecord}
        className="w-10 h-10 p-1 hover:scale-90 hover:cursor-pointer hover:bg-teal-600 rounded-full duration-200 transition-all"
      >
        <img src={record} alt="" className="w-full" />
      </button>
      <button
        onClick={handleLogModal}
        className="w-10 h-10 p-1.5 hover:scale-90 hover:cursor-pointer hover:bg-teal-600 rounded-full duration-200 transition-all"
      >
        <img src={settings} alt="" className="w-full" />
      </button>
      <button
        onClick={handleConsumptionModal}
        className="w-9 h-9 p-1 hover:scale-90 hover:cursor-pointer hover:bg-teal-600 rounded-full duration-200 transition-all"
      >
        <img src={consumption} alt="" className="w-full" />
      </button>
    </div>
  );
};

export default Sidebar;
