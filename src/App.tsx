import React from "react";
import clsx from "clsx";
import "./App.css";

import { dayList } from "./consts/calendar";
import { getCalendarDates, getMonthString } from "./libs/calendar";
import Arrow from "./icons/Arrow";
import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";

function App() {
  const [selectedMonth, setSelectedMonth] = React.useState<number>(1);
  const [selectedYear, setSelectedYear] = React.useState<number>(2023);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );

  const getDateClass = (date: Date): string => {
    if (date.getMonth() + 1 !== selectedMonth) {
      return "text-gray-400";
    }
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "bg-primary rounded-full text-white";
    }
    return "";
  };

  const today = new Date();

  // 작은달력에 넣었던 효과가 큰달력에 적용되지 않아서 한번 더  추가함
  const getSecondCalendarDateClass = (date: Date): string => {
    if (date.getMonth() + 1 !== selectedMonth) {
      return "text-gray-400 bg-zinc-100";
    }
    return "";
  };
  // 작은달력에 넣었던 효과가 큰달력에 적용되지 않아서 한번 더  추가함
  return (
    <div className="flex flex-row h-screen">
      <div className="w-[340px] h-screen border border-slate-300 p-4">
        <div className="text-2xl font-semibold mb-4 px-2 py-1">
          {getMonthString(12)}
        </div>
        <div className="min-w-[300px] grid grid-cols-7 gap-1 ">
          {dayList.map((day) => (
            <div key={day.short} className="text-center text-sm py-2 ">
              {day.short}
            </div>
          ))}
          {targetCalendarDates.map((date: Date) => (
            <div
              key={date.getDate()}
              className={`text-center text-sm py-3 ${getDateClass(date)}`}
            >
              {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="w-[1600px] h-[90px] flex flex-row justify-between p-3 items-center border border-state-300 rounded-tr-lg">
          <div className="flex justify-start gap-5 ">
            <Hamburger />
            <div className="text-4xl">
              {getMonthString(12)} {selectedYear}
            </div>
            <button className="flex text-primary border border-primary rounded-md p-2 gap-1">
              <select
                className="text-primary"
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                value={selectedMonth}
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {getMonthString(index + 1)}
                  </option>
                ))}
              </select>
            </button>
          </div>

          <div className="flex gap-3">
            <Search />
            <div className="flex bg-primary text-white p-2 gap-1">
              Add event <Plus />
            </div>
          </div>
        </div>

        <div className="min-w-screen grid grid-cols-7 gap-1 border border-state-300">
          {dayList.map((day) => (
            <div key={day.medium} className="text-center py-2 ">
              {day.medium}
            </div>
          ))}
        </div>

        <div className="min-w-full min-h-[1500px] grid grid-cols-7  border border-state-300">
          {targetCalendarDates.map((date: Date) => (
            <div
              key={date.getDate()}
              className={`text-left indent-3 py-2 border border-state-300 ${getSecondCalendarDateClass(
                date
              )}`}
            >
              {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
}
// clsx은 이해가 부족해서 못썼어요

export default App;
