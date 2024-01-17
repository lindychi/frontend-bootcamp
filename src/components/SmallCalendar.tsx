// SmallCalendar.tsx

import React from 'react';
import clsx from 'clsx';
import { getCalendarDates } from '../libs/calendar';

type Props = {
  selectedMonth: number;
  selectedYear: number;
  today: Date;
};

const SmallCalendar: React.FC<Props> = ({ selectedMonth, selectedYear, today }) => {
  const dates = getCalendarDates(selectedYear, selectedMonth);

  return (
    <div className="grid grid-cols-7 justify-center items-center text-[10px]">
      {dates?.map((date: Date, index) => {
        const isCurrentMonth =
          date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
        const isToday =
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear();
          const isSunday = date.getDay() === 0; // 일요일 여부 확인

          return (
            <div
              key={index}
              className={clsx(' py-3 grid justify-center items-center', {
                'bg-lime-500 text-white rounded-full font-bold': isToday && isCurrentMonth,
                'text-red-500 font-bold': isSunday, 
                'text-black font-bold': !isToday && isCurrentMonth && !isSunday,
                'text-zinc-300': !isToday && !isCurrentMonth,
              })}
          >
            {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
          </div>
        );
      })}
    </div>
  );
};

export default SmallCalendar;
