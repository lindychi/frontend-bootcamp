import React from "react";

import "./App.css";

import { dayList } from "./consts/calendar";

import { getCalendarDates, getMonthString } from "./libs/calendar";

import Arrow from "./icons/Arrow";
import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";

function App() {
  const [selectedMonth, setSelectedMonth] = React.useState<number>(12);
  const [selectedYear, setSelectedYear] = React.useState<number>(2023);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );

  const monthString = getMonthString(selectedMonth);

  const getDateClass = (date: Date): string => {
    if (date.getMonth() + 1 !== selectedMonth) {
      return "text-gray-400";
    }
    return "";
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[300px] h-screen rounded-lg p-4">
        <div className="text-xl font-semibold mb-4">{monthString}</div>
        <div className="grid grid-cols-7 gap-1">
          {dayList.map((day) => (
            <div key={day.short} className="text-center py-2">
              {day.short}
            </div>
          ))}
          {targetCalendarDates.map((date: Date) => (
            <div
              key={date.toString()}
              className={`text-center py-2 ${getDateClass(date)}`}
            >
              {date.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
