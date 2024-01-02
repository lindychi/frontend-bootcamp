// DayView.tsx

import React from 'react';
import clsx from 'clsx';


type Todo = {
  title: string;
  startTime: string;
  endTime: string;
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
      todo.startTime && 
      Number(todo.startTime.split(":")[0]) === selectedHour      
    );
  });
};

const calculateTopPosition = (startTime: string): string => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const totalMinutes = startHour * 60 + startMinute;
  return `${totalMinutes / 60 * 80}px`;
};

const calculateHeight = (startTime: string, endTime: string): string => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = endHour * 60 + endMinute;
  const minutesDiff = totalEndMinutes - totalStartMinutes;
  
  // 1시간 당 픽셀로 계산하여 반환 (예: 30분에 40px)
  const pixelPerHour = 80;
  const heightInPixel = (minutesDiff / 60) * pixelPerHour;

  return `${heightInPixel}px`;
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
    <div className='outer-box flex flex-row'>

    <div>
      {hours.map((hour) => (
        <div key={hour} className="flex flex-col h-[80px]">
          {hour > 9 ? hour : `0${hour}`}:00
        </div>
      ))}
    </div>
    <div className="relative"> 
      <div className='p-3'>
        {hours.map((hour) => (
          <div key={hour} className="outer-box w-[1024px] h-[80px]"></div>
        ))}



        
      </div>
      

      
     <div className='absolute top-3 left-3'>
    {hours.map((hour) => (
      <div key={hour} className="flex flex-col w-[1024px] ">
        {filterDate(todoData, today, hour).map((item: Todo, index: number) => (
          <div
            key={index}
            className={clsx('event-box','flex flex-row gap-4', {
              'bg-primary text-white': hour === today.getHours(),
            })}
            style={{
              top: calculateTopPosition(item.startTime), 
              height: calculateHeight(item.startTime, item.endTime),
            }}
          >
             <div className="bg-green-500">            
            <div>{item.title}</div>
            <div>{item.startTime}-{item.endTime}</div>
          </div>
          </div>
        ))}

        {filterDate(todoData, today, hour).length === 0 && (
          <div
            key={hour}
            className={clsx('flex flex-row gap-4 ', {
              'bg-primary text-white': hour === today.getHours(),
            })}
          >
            <div className='w-[1024px] h-[80px] grid items-center'>No Task</div>
          </div>
        )}
      </div>
    ))}
  </div>
    </div>
   
    </div>
  );
};
export default DayView;
