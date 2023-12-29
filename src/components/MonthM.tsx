import React from 'react'
import { getCalendarDates } from '../libs/calendar';
import clsx from 'clsx';


type Props = {}

export default function month({}: Props) {
const [selectedMonth, setSelectedMonth] = React.useState(12);
const [selectedYear, setSelectedYear] = React.useState(2023);
const targetCalendarDates: Date[] = getCalendarDates(
  selectedYear,
  selectedMonth
);
return (
  // <div>month</div>
  <div className="mediumDates w-[1214px] h-[923px] grid grid-cols-7 py-[3px] px-[4px]">
  {targetCalendarDates.map((date: Date) => (
    <div
      key={date.getTime()} // 각 날짜에 대한 고유한 key
      className={clsx(
        "inner-date",
        "p-[4px]",
        "font-medium",
        "text-xs",
        "border",
        "solid",
        "rgba(157, 158, 159, 0.60)",
        {
          "bg-white": date.getMonth() === new Date().getMonth(),
          "bg-gray-100": date.getMonth() !== new Date().getMonth(),
        }
      )}
    >
      {date.getDate()}
    </div>
  ))}
</div>
)
}