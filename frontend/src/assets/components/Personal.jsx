import React from "react";

const Personal = ({ responseData }) => {
  const {
    age,
    sex,
    height,
    weight,
    diet,
    exercise,
    dob_day,
    dob_month,
    dob_year,
    smoke_cons,
    alcohol_cons,
    current_med,
  } = responseData;

  return (
    <div className="px-4 py-6 bg-white rounded-lg ">
      <h3 className="text-2xl md:text-3xl text-gray-800 font-semibold mb-4">
        Personal Info
      </h3>
      <div className="grid grid-cols-2 gap-6 text-sm md:text-base">
        <div className="border-b border-r  p-2 rounded-lg">
          <div className="text-gray-700 font-semibold">Age:</div>
          <div>{age}</div>
        </div>
        <div className="border-b border-r p-2 rounded-lg">
          <div className="text-gray-700 font-semibold">Sex:</div>
          <div>{sex}</div>
        </div>
        {height && (
          <div className="border-b border-r p-2 rounded-lg">
            <div className="text-gray-700 font-semibold">Height:</div>
            <div>{height}</div>
          </div>
        )}
        {weight && (
          <div className="border-b border-r p-2 rounded-lg">
            <div className="text-gray-700 font-semibold">Weight:</div>
            <div>{weight}</div>
          </div>
        )}
        <div className="border-b border-r p-2 rounded-lg">
          <div className="text-gray-700 font-semibold">Date of Birth:</div>
          <div>{`${dob_day}/${dob_month}/${dob_year}`}</div>
        </div>
        <div className="border-b border-r p-2 rounded-lg">
          <div className="text-gray-700 font-semibold">Exercise:</div>
          <div>{exercise}</div>
        </div>
        <div className="border-b border-r-200 p-2 rounded-lg">
          <div className="text-gray-700 font-semibold">Diet:</div>
          <div>{diet}</div>
        </div>
        <div className="border-b border-r p-2 rounded-lg">
          <div className="text-gray-700 font-semibold">
            Alcohol Consumption:
          </div>
          <div>{alcohol_cons}</div>
        </div>
        <div className="border-b border-rp-2 rounded-lg">
          <div className="text-gray-700 font-semibold">
            Smoking Consumption:
          </div>
          <div>{smoke_cons}</div>
        </div>
        <div className="border-b border-rp-2 rounded-lg">
          <div className="text-gray-700 font-semibold">
            Current Medications:
          </div>
          <div>{current_med.join(", ")}</div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
