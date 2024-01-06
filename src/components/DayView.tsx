// DayView.tsx

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { getDayEvents } from '../services/eventService';
import { EventItem } from '../types/common';
import { time } from 'console';


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



const calculateHeight = (startedAt: string, endedAt: string): string => {
  const startDateTime = new Date(startedAt);
  const endDateTime = new Date(endedAt);

  const startMinutes = startDateTime.getHours() * 60 + startDateTime.getMinutes();
  const endMinutes = endDateTime.getHours() * 60 + endDateTime.getMinutes();

  const minutesDiff = endMinutes - startMinutes;

  
  const heightInPixel = minutesDiff/60 * 80;

  return `${heightInPixel}px`;
};

const extractTotalMinutes = (dateTimeString: string | Date): number => {
  const dateObject = typeof dateTimeString === 'string' ? new Date(dateTimeString) : dateTimeString;
  const totalMinutes = dateObject.getHours() * 60 + dateObject.getMinutes();
  return totalMinutes;
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
  
  const [events, setEvents] =useState<EventItem[]>([]);

  const loadEvents = async () => {
    const result =  await getDayEvents({year:2024,month:1,day:5});
    setEvents(result.data);
    console.log(result.data)
  };

  useEffect(()=>{
    loadEvents();
  },[])

  return (
    <div className='outer-box flex flex-row '>
      <div>
      {hours.map((hour) => (
        <div key={hour} className="flex flex-col h-[80px]">
          {hour > 9 ? hour : `0${hour}`}:00
        </div>
      ))}
    </div>

    
    <div className="relative">
  <div className="p-3 ">
    {hours.map((hour) => (
      <div key={hour} className="outer-box h-[80px]"></div>
    ))}
  </div>
  <div>
    {events.map((event:EventItem)=>
    <div className='absolute' style={{ 
      top: `${extractTotalMinutes(event.startedAt)/60*80}px`,
      left : '20px' ,
      height: event.endedAt ? calculateHeight(event.startedAt.toString(), event.endedAt.toString()) : '0',
      backgroundColor: event.categories?.color ?? "#fff"
      }}>{event.title}</div>
    )}
  </div>

  <div className="">
    {hours.map((hour) => (
      <div key={hour} className="flex flex-col w-[calc(100vw-330px)]  ">
        {filterDate(todoData, today, hour).map((item: Todo, index: number) => (
          <div
            key={index}
            className={clsx('event-box', 'flex flex-row ', {
              'bg-primary text-white': hour === today.getHours(),
            })}
            
          >
            <div className="absolute bg-green-500  " 
            style={{ 
              top: `${hour * 80+13}px`, 
              left : '20px' ,
              height: (calculateHeight(item.startTime, item.endTime) as unknown as number) 
              }}>
              <div>{item.title}</div>
              <div>
                {item.startTime}-{item.endTime}
              </div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
</div>

   
    </div>
  );
};
export default DayView;
