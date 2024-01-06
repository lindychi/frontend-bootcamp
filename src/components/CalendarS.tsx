import React from "react";

import clsx from "clsx";
import "../App.css";

import { DateName, dayList } from "../consts/calendar";
import { getCalendarDates, getMonthString } from "../libs/calendar";

type Props = {
  selectedMonth: number;
  selectedYear: number;
  dayList: DateName[];
};

export default function CalendarS({ selectedMonth, selectedYear }: Props) {
  // const [selectedMonth, setSelectedMonth] = React.useState(12);
  // const [selectedYear, setSelectedYear] = React.useState(2023);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );

  return (
    <div className="calendar_s-container">
      {/* 미니 캘린더-월 */}
      <div className="text-center">
        <div className="month_s lex-col w-[250px] h-[47px] py-[10px] px-[16px] font-medium">
          {getMonthString(selectedMonth)}
        </div>
        {/* 미니 캘린더-요일 */}
        <div className="day-s flex items-center justify-between w-[250px] h-[33px] p-[10px]">
          {dayList.map(({ short }, index) => (
            <div
              key={index}
              className="day px-[5px] mx-auto text-center text-xs"
            >
              {short}
            </div>
          ))}
        </div>
        {/* 미니캘린더-날짜     */}
        <div className="calendar_s grid grid-cols-7 w-[250px] h-[218px] p-[10px]">
          {targetCalendarDates.map((date: Date) => (
            <div
              key={date.getDate()} // 각 날짜에 대한 고유한 key
              className={clsx(
                "inner-date",
                "p-[5px]",
                "font-medium",
                "text-xs",
                "text-center",
                "align-middle",

                {
                  "text-gray-800": date.getMonth() === selectedMonth - 1,
                  "text-gray-400": date.getMonth() !== selectedMonth - 1,
                  "text-white bg-blue-500 rounded-2xl w-6 h-6 flex items-center justify-center":
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth(),
                  // "bg-blue-500 text-white rounded-2xl": date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth(),
                }
              )}
            >
              {date.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
