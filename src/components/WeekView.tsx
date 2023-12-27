// WeekView.tsx

import React from 'react';
import clsx from 'clsx';

type Todo = {
  title: string;
  time: string;
  date: Date;
};

type Props = {
  todoData: Todo[];
  selectedMonth: number;
  selectedYear: number;
  today: Date;
  selectedDate: Date | null;
  dates: Date[];
};

const WeekView: React.FC<Props> = ({
  todoData,
  selectedMonth,
  selectedYear,
  today,
  selectedDate,
  dates,
}) => {
  // 이번 주를 표시하는 코드
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // 일요일로 이동

  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return date;
  });

  return (
    <div className="grid grid-cols-7 w-[1214px] h-min-[923px]">
      {weekDates.map((date: Date, index) => {
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

            {todoData
              .filter((item) => {
                const todoDate = new Date(item.date);
                return (
                  todoDate >= date &&
                  todoDate < new Date(date.getTime() + 24 * 60 * 60 * 1000)
                );
              })
              .map((item, index) => (
                <div key={index} className="flex flex-row gap-4">
                  <div>{item.title}</div>
                  <div>{item.time}</div>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default WeekView;
