import React from "react";
import { getCalendarDates } from "../libs/calendar";
import clsx from "clsx";
import { dayList } from "../consts/calendar";
import SevenDays from "./SevenDays";

type Props = {};

export default function MonthCal({}: Props) {
  const [selectedMonth, setSelectedMonth] = React.useState(1);
  const [selectedYear, setSelectedYear] = React.useState(2024);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );
  return (
    <div>
      <div className="bg-blue-400">
        <SevenDays dayList={dayList} />
      </div>
      <div className="mediumDates w-[1214px] h-[923px] grid grid-cols-7">
        {targetCalendarDates.map((date: Date) => (
          <div
            key={date.getDate()} // 각 날짜에 대한 고유한 key
            className={clsx(
              "inner-date",
              "p-2.5",
              "font-medium",
              "text-xs",
              "border",
              "solid",
              "rgba(157, 158, 159, 0.60)",
              {
                "text-gray-800": date.getMonth() === selectedMonth - 1,
                "text-gray-400": date.getMonth() !== selectedMonth - 1,
              }
            )}
          >
            <div
              className={clsx({
                "bg-blue-500 w-6 h-6 flex items-center justify-center rounded-full text-white":
                  date.getDate() === new Date().getDate() &&
                  date.getMonth() === new Date().getMonth(),
              })}
            >
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
