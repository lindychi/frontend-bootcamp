import React from "react";
import { getCalendarDates, getMonthString } from "../libs/calendar";

type Day = {
  short: string;
};

type YearViewProps = {
  year: number;
  getDateClass: (date: Date) => string;
  dayList: Day[];
};

const YearView: React.FC<YearViewProps> = ({ year, getDateClass, dayList }) => {
  const renderMonthCalendar = (month: number) => {
    const targetCalendarDates = getCalendarDates(year, month);
    return (
      <div className="min-w-[300px] grid grid-cols-7 gap-1">
        {dayList.map((day) => (
          <div key={day.short} className="text-center text-sm py-2">
            {day.short}
          </div>
        ))}
        {targetCalendarDates.map((date, index) => (
          <div
            key={index}
            className={`text-center text-sm py-3 ${getDateClass(date)}`}
          >
            {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-wrap">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
        <div key={month} className="m-4">
          <h2 className="text-lg font-bold mb-2">{getMonthString(month)}</h2>
          {renderMonthCalendar(month)}
        </div>
      ))}
    </div>
  );
};

export default YearView;
