import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import DayHeader from './DayHeader';
import { getDayEvents } from '../services/eventService';
import { EventItem } from '../types/common';


type Todo = {
  title: string;
  startedAt: Date;
  endedAt: Date;

};

type Props = {
  selectedMonth: number;
  selectedYear: number;
  today: Date;
  selectedDate: Date | null;
  dates: Date[];
  todos: Todo[];
};



const BigCalendar: React.FC<Props> = ({
  
  selectedMonth,
  selectedYear,
  today,
  selectedDate,
  dates,
  todos,
}) => {

  const [events, setEvents] = useState<EventItem[]>([]);
  const loadEvents = async () => {
    const result =  await getDayEvents({year:2024});
    setEvents(result.data);
    console.log(result.data)
  };

  useEffect(()=>{
    loadEvents();
  },[]);

  return (
    <div className='' >
      <DayHeader className="w-full grid grid-cols-7 bg-lime-300 justify-center items-center font-bold" form='medium' />
      <div className="grid grid-cols-7 grid-rows-6 w-full h-[calc(100vh)]  ">
        {dates.map((date: Date, index) => {
          const isCurrentMonth =
            date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
            const isSunday = date.getDay() === 0;

            const dayEvents = events.filter(event => {
              const eventDate = new Date(event.startedAt);
              return eventDate.getDate() === date.getDate() &&
                     eventDate.getMonth() === date.getMonth() &&
                     eventDate.getFullYear() === date.getFullYear();
            })

            const extraEventsCount = dayEvents.length > 3 ? dayEvents.length - 3 : 0;
            const displayedEvents = dayEvents.slice(0, 3);
            
         

            

          return (
           
            <div
              key={index}
              className={clsx(' outer-box justify-start items-start p-3 font-bold  relative', {
                'bg-lime-300 text-white': isToday,
                'text-black': !isToday && isCurrentMonth,
                'text-zinc-500 bg-zinc-100 opacity-30': !isToday && !isCurrentMonth,
                'text-red-500 font-bold': isSunday,
              })}
            >
              {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
              

              
              <div className='absolute bottom-2 w-[calc(100%-20px)] bg-lime-100 rounded-md p-2 text-black'>
              {displayedEvents.map((event: EventItem) => (
                <div key={event.id}>{event.title}</div>
              ))}
              {extraEventsCount > 0 && (
                <div className="more-events bg-lime-500 text-white rounded-lg">+{extraEventsCount} more </div>
              )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BigCalendar;
