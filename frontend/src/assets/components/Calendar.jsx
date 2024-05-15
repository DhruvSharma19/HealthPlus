import React, { useState, useRef, useEffect } from "react";

const Calendar = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthName = (month) => {
    const options = { month: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(2000, month, 1)
    );
  };

  const getWeekdayName = (day) => {
    const options = { weekday: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(2000, 0, day + 1)
    );
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setIsMonthDropdownOpen(false);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleClickOutside = (event) => {
    if (
      monthDropdownRef.current &&
      !monthDropdownRef.current.contains(event.target)
    ) {
      setIsMonthDropdownOpen(false);
    }

    if (
      yearDropdownRef.current &&
      !yearDropdownRef.current.contains(event.target)
    ) {
      setIsYearDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderDaysList = () => {
    const daysList = [];

    for (let i = 0; i < 7; i++) {
      const dayName = getWeekdayName(i);
      daysList.push(
        <div
          key={`day-${i}`}
          className="flex-1 text-center w-8 text-gray-700 text-sm font-semibold"
        >
          {dayName}
        </div>
      );
    }

    return daysList;
  };

  const renderMonthDropdown = () => {
    const monthOptions = Array.from({ length: 12 }, (_, i) => {
      const month = new Date(2000, i, 1).toLocaleString("default", {
        month: "short",
      });
      return {
        value: i,
        label: month,
      };
    });

    return (
      <div className="relative inline-block" ref={monthDropdownRef}>
        <button
          className="bg-white text-teal-500  hover:scale-105 w-18 sm:mx-1  transition-all duration-300 text-3xl font-bold"
          onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
        >
          {getMonthName(selectedMonth)}
        </button>
        {isMonthDropdownOpen && (
          <div className="absolute mt-2 py-1 w-20 overflow-y-auto max-h-44 bg-white text-gray-600 rounded-lg z-10 font-medium">
            {monthOptions.map((option) => (
              <div
                key={option.value}
                className="px-2 py-1 hover:bg-gray-200 cursor-pointer text-sm"
                onClick={() => handleMonthChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderYearDropdown = () => {
    const yearOptions = Array.from({ length: 50 }, (_, i) => {
      const year = currentDate.getFullYear() - 25 + i;
      return {
        value: year,
        label: year.toString(),
      };
    });

    return (
      <div className="relative inline-block" ref={yearDropdownRef}>
        <button
          className="bg-white text-gray-700 hover:scale-105 w-16 sm:mx-1 transition-all duration-300 text-2xl font-bold"
          onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
        >
          {selectedYear}
        </button>
        {isYearDropdownOpen && (
          <div className="absolute mt-2 py-1 w-24 max-h-44 overflow-y-auto text-gray-600 bg-white  rounded-lg    z-10 font-medium">
            {yearOptions.map((option) => (
              <div
                key={option.value}
                className="px-2 py-1 hover:bg-gray-200 cursor-pointer text-sm"
                onClick={() => handleYearChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

    const calendar = [];

    // Add empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      calendar.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Add cells for current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const isCurrentDate = date.toDateString() === currentDate.toDateString();

      const cellClasses = `w-8 h-8 rounded-2xl text-sm text-center cursor-pointer ${
        isSelected
          ? "bg-teal-500 text-white transition-all duration-300 "
          : isCurrentDate
          ? "bg-sky-500 text-white"
          : "text-gray-600"
      }`;

      calendar.push(
        <div
          key={`date-${i}`}
          className={cellClasses}
          onClick={() => handleDateClick(date)}
        >
          <div className="flex items-center justify-center h-full">{i}</div>
        </div>
      );
    }

    return calendar;
  };

  return (
    <div className="w-full rounded-lg flex overflow-scroll flex-col items-center p-3 justify-center md:flex-row lg:flex-col bg-white">
      <div className="rounded-s-lg flex gap-1 items-center mb-2 justify-center sm:w-40">
        <div className="text-teal-500 font-bold text-xl">
          {renderMonthDropdown()}
        </div>
        <div className="text-2xl font-bold">{renderYearDropdown()}</div>
      </div>
      <div className="flex flex-col rounded-e-md justify-center p-1 ">
        <div className="flex justify-center sm:mb-">
          <div className="grid-container mx-auto">
            <div className="gridd gap-1">{renderDaysList()}</div>
          </div>
        </div>
        <div className="grid-container mx-auto">
          <div className="gridd gap-1">{renderCalendar()}</div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
