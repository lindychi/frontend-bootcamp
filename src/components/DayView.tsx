// DayView.tsx

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

const filterDate = (todos: Todo[], selectedDate: Date | null, selectedHour: number): Todo[] => {
  if (!selectedDate) {
    return [];
  }

  return todos.filter((todo) => {
    const todoDate = new Date(todo.date);

    return (
      todoDate.getDate() === selectedDate.getDate() &&
      todoDate.getMonth() === selectedDate.getMonth() &&
      todoDate.getFullYear() === selectedDate.getFullYear() &&
      todoDate.getHours() === selectedHour
    );
  });
};

const DayView: React.FC<Props> = ({
  todoData,
  selectedMonth,
  selectedYear,
  today,
  selectedDate,
  dates,
}) => {
  const hours = Array.from({ length: 24 }, (_, index) => index);

  return (
    <div className="grid grid-cols-1 w-[1214px] h-min-[923px]">
      {hours.map((hour) => (
        <div
          key={hour}
          className={clsx('h-[80px] grid grid-cols-2 ', {
            'bg-primary text-white': hour === today.getHours(),
          })}
        >
          <div className="flex items-center  ">
            {hour > 9 ? hour : `0${hour}`}:00
          </div>

          <div className="flex flex-col  w-1024px outer-box">
            {filterDate(todoData, selectedDate, hour).map((item: Todo, index: number) => (
              <div
                key={index}
                className={clsx('flex flex-row  gap-4 ', {
                  'bg-primary text-white': hour === today.getHours(),
                })}
              >
                <div>{item.title}</div>
                <div>{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayView;
