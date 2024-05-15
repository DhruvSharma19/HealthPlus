import React from "react";

const MedicalHistory = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center">
        <h2 className="text-xl p-2 w-full text-center text-gray-800 border-b font-semibold">
          Medical History
        </h2>
        <p className="w-full h-full bg-teal-50 grid place-content-center italic md:text-lg text-teal-900">
          None
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b text-gray-800 bg-gray-100">
            <th className="py-2 px-4 border-b font-semibold text-center text-xl">
              Medical History
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border">
              <td className="p-2 text-gray-800 px-5">
                <div className="flex items-center text-base md:text-lg text-gray-700">
                  {item}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalHistory;
