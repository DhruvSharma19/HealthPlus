import React from "react";

const GlucoseLevel = ({ responseData }) => {
  if (
    !responseData ||
    !responseData.blood_glucose ||
    !responseData.blood_glucose.date ||
    responseData.blood_glucose.date.length === 0
  ) {
    return (
      <p className="w-full h-full grid place-content-center italic  md:text-lg text-gray-500 bg-sky-50">
        No values in log
      </p>
    );
  }

  const getCellStyles = (value, isAfterColumn) => {
    if (isAfterColumn) {
      if (value > 180) {
        return "bg-red-100";
      }
    } else {
      if (value > 120) {
        return "bg-red-100";
      }
    }
    return "";
  };

  let prevDate = null; // Track previous date

  return (
    <div className="px-1 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b font-semibold text-left">Date</th>
            <th className="py-2 px-4 border-b font-semibold text-left">
              Before
            </th>
            <th className="py-2 px-4 border-b font-semibold text-left">
              After
            </th>
          </tr>
        </thead>
        <tbody>
          {responseData.blood_glucose.date.map((date, index) => {
            const currentBefore = responseData.blood_glucose.before[index];
            const currentAfter = responseData.blood_glucose.after[index];

            // Skip the date if both before and after values are empty
            if (!currentBefore && !currentAfter) {
              return null;
            }

            const isFirstDate = prevDate !== date;
            prevDate = date;

            return (
              <tr key={index} className="border-b">
                <td
                  className={`py-2 px-1 border-r text-gray-800 ${
                    isFirstDate ? "bg-sky-100" : "px-5"
                  }`}
                >
                  <div className="flex items-center">
                    {isFirstDate && (
                      <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                    )}
                    <div>{date}</div>
                  </div>
                </td>
                <td
                  className={`py-2 px-4 border-r ${getCellStyles(
                    currentBefore,
                    false
                  )}`}
                >
                  {currentBefore}
                </td>
                <td
                  className={`py-2 px-4 ${getCellStyles(currentAfter, true)}`}
                >
                  {currentAfter}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GlucoseLevel;
