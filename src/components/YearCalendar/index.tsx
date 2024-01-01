import React from "react";
import SmallMonthCalendar from "../SmallMonthCalendar";

type Props = { year: number };

export default function YearCalendar({ year }: Props) {
  return (
    <div className="grid grid-cols-4 w-full py-2">
      {[
        Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <div className="flex flex-col justify-start items-center">
            <div>{month}</div>
            <SmallMonthCalendar key={month} year={year} month={month} />
          </div>
        )),
      ]}
    </div>
  );
}
