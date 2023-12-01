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
      <div className="w-[300px] h-screen border border-slate-300 p-4">
        <div className="text-2xl font-semibold mb-4 px-2 py-1">
          {monthString}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {dayList.map((day) => (
            <div key={day.short} className="text-center py-2 ">
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
      <div>
        <div className="w-[1500px] h-[77px] flex flex-row justify-between p-3 items-center border border-state-300 rounded-tr-lg">
          <div className="flex justify-start gap-5 ">
            <Hamburger />
            <div className="text-5xl">December 2023</div>
            <div className="flex text-primary border border-primary rounded-md p-2 gap-1">
              Month <Arrow />
            </div>
          </div>
          <div className="flex gap-3">
            <Search />
            <div className="flex bg-primary text-white p-2 gap-1">
              Add event <Plus />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 border border-state-300">
          {dayList.map((day) => (
            <div key={day.medium} className="text-center py-2 ">
              {day.medium}
            </div>
          ))}
        </div>
        <div className="w-full h-full grid grid-cols-7  border border-state-300">
          {targetCalendarDates.map((date: Date) => (
            <div
              key={date.toString()}
              className={`text-left indent-3 py-2 border border-state-300 ${getSecondCalendarDateClass(
                date
              )}`}
            >
              {date.getDate()}
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
