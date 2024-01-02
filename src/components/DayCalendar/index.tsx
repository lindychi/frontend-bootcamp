import React from "react";

import TimeSlotLabel from "../TimeSlotLabel";
import DayColumn from "./DayColumn";

type Props = { year: number; month: number; day: number };

export default function DayCalendar({ year, month, day }: Props) {
  return (
    <div className="flex w-full">
      <TimeSlotLabel />

      <DayColumn year={year} month={month} day={day} />
    </div>
  );
}
