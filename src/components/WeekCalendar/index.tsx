import React from "react";

import { getWeekDates } from "../../libs/calendar";

import TimeSlotLabel from "../TimeSlotLabel";
import DayColumn from "../DayCalendar/DayColumn";

type Props = { year: number; month: number; day: number };

export default function WeekCalendar({ year, month, day }: Props) {
  const weekList = getWeekDates(year, month, day);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-70px)]">
      <div className="flex w-full">
        <div className="w-[70px]"></div>
        {weekList.map((date) => (
          <div className="w-[calc(100%/7)] text-center">
            <div className="text-neutral-500 text-xs font-medium">
              {date.getDate()}
            </div>
            <div className="text-neutral-500 text-xs font-medium">
              {date.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full h-[calc(100%)] overflow-y-scroll">
        <TimeSlotLabel />

        <div className="w-full grid grid-cols-7">
          {weekList.map((date, index) => (
            <DayColumn
              year={date.getFullYear()}
              month={date.getMonth()}
              day={date.getDate()}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
