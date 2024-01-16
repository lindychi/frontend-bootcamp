import React from 'react';
import clsx from 'clsx';
import DayHeader from './DayHeader';

type Todo = {
  title: string;
  startedAt: string;
  endedAt: string;

};

type Props = {

  selectedMonth: number;
  selectedYear: number;
  today: Date;
  selectedDate: Date | null;
  dates: Date[];
};



const BigCalendar: React.FC<Props> = ({
  
  selectedMonth,
  selectedYear,
  today,
  selectedDate,
  dates,
}) => {
  ;

  return (
    <div>
      <DayHeader className="grid grid-cols-7 outer-box" form='medium' />
      <div className="grid grid-cols-7 w-[1214px] h-min-[923px]">
        {dates.map((date: Date, index) => {
          const isCurrentMonth =
            date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          const isSelectedDate =
            selectedDate &&
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();

          return (
            <div
              key={index}
              className={clsx('w-[173px] h-[184px] outer-box p-2.5', {
                'bg-primary text-white': isToday,
                'text-black': !isToday && isCurrentMonth,
                'text-zinc-500 bg-zinc-100 opacity-30': !isToday && !isCurrentMonth,
              })}
            >
              {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}

             
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BigCalendar;
