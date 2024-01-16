// DayView.tsx

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { getDayEvents } from '../services/eventService';
import { EventItem } from '../types/common';

type Props = {
  selectedDate: Date | null;
};

const calculateHeight = (startedAt: string, endedAt: string): string => {
  const startDateTime = new Date(startedAt);
  const endDateTime = new Date(endedAt);

  const startMinutes = startDateTime.getHours() * 60 + startDateTime.getMinutes();
  const endMinutes = endDateTime.getHours() * 60 + endDateTime.getMinutes();

  const heightInPixel = endMinutes - startMinutes ;

  return `${heightInPixel}px`;
    
};

const extractTotalMinutes = (dateTimeString: string | Date): number => {
  const dateObject = typeof dateTimeString === 'string' ? new Date(dateTimeString) : dateTimeString;
  const totalMinutes = dateObject.getHours() * 60 + dateObject.getMinutes();
  return totalMinutes;
};

const DayView: React.FC<Props> = ({ selectedDate }) => {
  const hours = Array.from({ length: 24 }, (_, index) => index);
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
  <div className=' flex flex-row '>
      <div className="relative w-full">
        
        <div className=" ">
        {hours.map((hour) => (
        <div key={hour} className="outer-box w-full h-[60px]"></div>
        ))}
        </div>
      <div>
    {events.map((event:EventItem)=>
        <div className='absolute max-w-full grid items-center justify-center' style={{ 
              top: `${extractTotalMinutes(event.startedAt)}px`,
              left : '5px' ,
              height: event.endedAt ? calculateHeight(event.startedAt.toString(), event.endedAt.toString()) : '0',
              backgroundColor: event.categories?.color ?? "#fff"
              }}>{event.title}</div>
              )}
        </div>
        
      </div>
    </div>
  );
};
export default DayView;
