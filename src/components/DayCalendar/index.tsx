import React from "react";

import TimeSlotLabel from "../TimeSlotLabel";
import DayColumn from "./DayColumn";

type Props = { year: number; month: number; day: number };

export default function DayCalendar({ year, month, day }: Props) {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-70px)]">
      <div className="flex w-full h-[calc(100%)] overflow-y-scroll">
        <TimeSlotLabel />

        <DayColumn year={year} month={month} day={day} />
      </div>
    </div>
  );
}
