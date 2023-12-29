import React from "react";

import clsx from "clsx";
import "./App.css";

import { DateName, dayList } from "../consts/calendar";
import { getCalendarDates, getMonthString } from "../libs/calendar";

type Props = {};

export default function CalendarS({}: Props) {
  const [selectedMonth, setSelectedMonth] = React.useState(12);
  const [selectedYear, setSelectedYear] = React.useState(2023);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );

  return (
    // {/* 미니 캘린더-월 */}
    <div>
      <div className="month_s flex-col w-[250px] h-[47px] py-[10px] px-[16px] font-medium">
        {getMonthString(12)}
      </div>
      {/* 미니 캘린더-요일 */}
      <div className="day-s flex items-center justify-between w-[250px] h-[33px] p-[10px]">
        {dayList.map(({ short }, index) => (
          <div key={index} className="day px-[5px] mx-auto text-center text-xs">
            {short}
          </div>
        ))}
      </div>
      {/* 미니캘린더-날짜     */}
      <div className="calendar_s grid grid-cols-7 w-[250px] h-[218px] p-[10px]">
        {targetCalendarDates.map((date: Date) => (
          <div
            key={date.getTime()} // 각 날짜에 대한 고유한 key
            className={clsx(
              "inner-date",
              "p-[5px]",
              "font-medium",
              "text-xs",
              "text-center",
              "align-middle",
              {
                "text-gray-800": date.getMonth() === new Date().getMonth(),
                "text-gray-400": date.getMonth() !== new Date().getMonth(),
              }
            )}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}
