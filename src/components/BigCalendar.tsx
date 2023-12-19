import React from 'react';
import clsx from 'clsx';

type Todo = {
  title: string;
  time: string;
  date: Date;
};

type Props = {
  todoData: Todo[]; // todoData 추가
  selectedMonth: number;
  selectedYear: number;
  today: Date;
  selectedDate: Date | null; // selectedDate 추가
  dates: Date[];
};

const filterDate = (todos: Todo[], selectedDate: Date | null): Todo[] => {
  if (!selectedDate) {
    return [];
  }

  return todos.filter((todo) => {
    const todoDate = new Date(todo.date);

    return (
      todoDate.getDate() === selectedDate.getDate() &&
      todoDate.getMonth() === selectedDate.getMonth() &&
      todoDate.getFullYear() === selectedDate.getFullYear()
    );
  });
};
const BigCalendar: React.FC<Props> = ({
  todoData,
  selectedMonth,
  selectedYear,
  today,
  selectedDate,
  dates,
}) => {
  console.log(todoData); 




  return (
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

            {filterDate(todoData, date).map((item, index) => (
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

export default BigCalendar;

