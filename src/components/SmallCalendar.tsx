
import React from 'react';
import clsx from 'clsx';

type Props = {
  dates: Date[];
  selectedMonth: number;
  selectedYear: number;
  today: Date;
};


const SmallCalendar: React.FC<Props> = ({ dates, selectedMonth, selectedYear, today }) => {
    
    
    return (
        <div className="grid grid-cols-7 text-[10px]">
        {dates.map((date: Date, index) => {
          const isCurrentMonth = date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
  
          return (
            <div
              key={index}
              className={`w-[30px] h-[33px] grid justify-center items-center ${isToday ? 'bg-primary text-white rounded-full' : ''} ${!isToday && isCurrentMonth ? 'text-black' : ''} ${!isToday && !isCurrentMonth ? 'text-zinc-500' : ''}`}
            >
              {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
            </div>
          );
        })}
      </div>
    );
  };
  
  export default SmallCalendar;