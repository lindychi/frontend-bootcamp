import React, { useState } from "react";
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
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const renderMonthCalendar = (month: number) => {
    const targetCalendarDates = getCalendarDates(currentYear, month);

    return (
      <div className="min-w-[350px] grid grid-cols-7 gap-4">
        {dayList.map((day) => (
          <div key={day.short} className="text-center text-sm py-2">
            {day.short}
          </div>
        ))}
        {targetCalendarDates.map((date, index) => (
          <div key={index} className={`text-center text-sm py-3 `}>
            {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
          </div>
        ))}
      </div>
    );
  };
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap p-2 gap-3">
      <div className="flex justify-between w-full">
        <div className="flex flex-row justify-between w-[calc(100vw-420px)]">
          {months.slice(0, 4).map((month) => (
            <div key={month} className="m-4 w-[calc(100vw-420px)]">
              <h2 className="text-lg font-bold mb-2">
                {getMonthString(month)}
              </h2>
              {renderMonthCalendar(month)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-row justify-between w-[calc(100vw-420px)]">
          {months.slice(4, 8).map((month) => (
            <div key={month} className="m-4 w-[calc(100vw-420px)]">
              <h2 className="text-lg font-bold mb-2">
                {getMonthString(month)}
              </h2>
              {renderMonthCalendar(month)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-row justify-between w-[calc(100vw-420px)]">
          {months.slice(8, 12).map((month) => (
            <div key={month} className="m-4 w-[calc(100vw-420px)]">
              <h2 className="text-lg font-bold mb-2">
                {getMonthString(month)}
              </h2>
              {renderMonthCalendar(month)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearView;
