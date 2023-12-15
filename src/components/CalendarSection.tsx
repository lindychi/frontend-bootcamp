import React from "react";
import { getMonthString } from "../libs/calendar";
import { dayList } from "../consts/calendar";
type CalendarSectionProps = {
  selectedMonth: number;
  targetCalendarDates: Date[] | null;
  getDateClass: (date: Date) => string;
};

const CalendarSection: React.FC<CalendarSectionProps> = ({
  selectedMonth,
  targetCalendarDates,
  getDateClass,
}) => {
  return (
    <div className="w-[340px] h-screen border border-slate-300 p-4">
      <div className="text-2xl font-semibold mb-4 px-2 py-1">
        {getMonthString(selectedMonth)}
      </div>
      <div className="min-w-[300px] grid grid-cols-7 gap-1 ">
        {dayList.map((day) => (
          <div key={day.short} className="text-center text-sm py-2 ">
            {day.short}
          </div>
        ))}
        {targetCalendarDates?.map((date, index) => (
          <div
            key={index}
            className={`text-center text-sm py-3 ${getDateClass(date)}`}
          >
            {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
          </div>
        ))}
      </div>
      <div className="text-2xl font-semibold mb-4 px-2 py-1 ">Today</div>
      <div className="text-2xl font-semibold mb-4 px-2 py-1 ">Tomorrow</div>
      <div className="text-2xl font-semibold mb-4 px-2 py-1 ">Vacations</div>
    </div>
  );
};

export default CalendarSection;
