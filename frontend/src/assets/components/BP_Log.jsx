import React from "react";

const BP_Log = ({ responseData }) => {
  if (
    !responseData ||
    !responseData.bp_log ||
    !responseData.bp_log.date ||
    responseData.bp_log.date.length === 0
  ) {
    return (
      <p className="h-full w-full grid place-content-center italic bg-pink-50 text-gray-500 md:text-lg">
        Add your first value
      </p>
    );
  }

  return (
    <div className="p-2 mb-1 rounded-lg">
      {responseData.bp_log.date.map((date, index) => {
        const currentHigh = responseData.bp_log.high[index];
        const currentLow = responseData.bp_log.low[index];

        // Skip the log entry if high and low values are empty
        if (!currentHigh && !currentLow) {
          return null;
        }

        const isFirstValueOfDay =
          index === 0 || responseData.bp_log.date[index - 1] !== date;

        return (
          <div key={index} className="flex flex-col mb-1">
            {isFirstValueOfDay && (
              <div className="flex items-center mb-2 bg-slate-200 rounded-md mx-1 p-2">
                <div className="h-2 w-2 bg-gray-700 rounded-full mr-2"></div>
                <h2 className="text-lg font-semibold text-gray-900">{date}</h2>
              </div>
            )}

            <div className="ml-1">
              <div
                className={`text-sm text-gray-700 border border-gray-400 rounded-md p-3 flex justify-between items-center ${
                  currentHigh > 190 && currentLow > 90
                    ? "bg-purple-100"
                    : currentHigh > 190
                    ? "bg-red-100"
                    : currentLow > 90
                    ? "bg-orange-100"
                    : ""
                }`}
              >
                <div className="flex">
                  <p className="font-semibold">{currentHigh}</p>
                  <span className="text-gray-500 mx-1">/</span>
                  <p>{currentLow}</p>
                </div>
                <div>High / Low</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BP_Log;
