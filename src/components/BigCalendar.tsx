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
  const loadEvents = async (selectedDate: Date | null) => {
    if (!selectedDate) {
      return;
    }

    const result = await getDayEvents({
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
      day: selectedDate.getDate(),
    });
    setEvents(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    loadEvents(selectedDate);
  }, [selectedDate]);

  return (
    <div >
      <DayHeader className="grid grid-cols-7" form='medium' />
      <div className="grid grid-cols-7 w-[1214px] h-min-[923px]">
        {dates.map((date: Date, index) => {
          const isCurrentMonth =
            date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

            const dayEvents = events.filter(event => 
              event.startedAt.getDate() === date.getDate() &&
              event.startedAt.getMonth() === date.getMonth() &&
              event.startedAt.getFullYear() === date.getFullYear());

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

              {dayEvents.map((event: EventItem) => (
        <div key={event.id}>{event.title}</div>))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BigCalendar;
