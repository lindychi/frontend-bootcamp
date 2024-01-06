import React from "react";
import CalendarS from "../components/CalendarS";

import { dayList } from "../consts/calendar";
import { getCalendarDates, getMonthString } from "../libs/calendar";

type Props = {};

export default function YearCal({}: Props) {
  const monthsArray = Array.from({ length: 12 }, (_, index) => index + 1);
  const [selectedMonth, setSelectedMonth] = React.useState(1);
  const [selectedYear, setSelectedYear] = React.useState(2024);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );

  return (
    <div>
      {/* 연력 */}
      <div className=" px-10 py-">
        <div className="calendar_s flex flex-wrap justify-around w-100%">
          {monthsArray.map((month) => (
            <div key={month}>
              <CalendarS
                selectedMonth={month}
                selectedYear={selectedYear}
                dayList={dayList}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
