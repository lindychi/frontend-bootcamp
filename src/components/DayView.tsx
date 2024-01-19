// DayView.tsx

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { getDayEvents } from '../services/eventService';
import { EventItem } from '../types/common';

type Props = {
  selectedDate: Date | null;
};

const calculateHeight = (startedAt: string, endedAt: string, selectedDate: Date): string => {
  const startDateTime = new Date(startedAt);
  const endDateTime = new Date(endedAt);
  const selectedDayStart = new Date(selectedDate);
  selectedDayStart.setHours(0, 0, 0, 0);
  const selectedDayEnd = new Date(selectedDate);
  selectedDayEnd.setHours(23, 59, 59, 999);

  let startMinutes, endMinutes;

  if (startDateTime.toDateString() === selectedDayStart.toDateString()) {
    startMinutes = startDateTime.getHours() * 60 + startDateTime.getMinutes();
    endMinutes = endDateTime.toDateString() === startDateTime.toDateString() ? 
                  endDateTime.getHours() * 60 + endDateTime.getMinutes() : 
                  24 * 60 - 1;
  } else if (endDateTime.toDateString() === selectedDayStart.toDateString()) {
    startMinutes = 0;
    endMinutes = endDateTime.getHours() * 60 + endDateTime.getMinutes();
  } else {
    // 이벤트가 선택된 날짜에 해당하지 않는 경우, 높이를 0으로 설정
    return '0px';
  }

  const heightInPixel = endMinutes - startMinutes;
  return `${heightInPixel}px`;
};


const extractTotalMinutes = (dateTimeString: string | Date, selectedDate: Date): number => {
  const dateObject = typeof dateTimeString === 'string' ? new Date(dateTimeString) : dateTimeString;
  const selectedDayStart = new Date(selectedDate);
  selectedDayStart.setHours(0, 0, 0, 0);

  // 이벤트 시작 날짜가 선택된 날짜와 다르면 0분(0시)으로 설정
  if (dateObject.toDateString() !== selectedDayStart.toDateString()) {
    return 0;
  }

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
        <div className='absolute  grid items-center justify-center' style={{ 
              top: selectedDate ? `${extractTotalMinutes(event.startedAt, selectedDate)}px` : '0px',
              left : '5px' ,
              height: event.endedAt && selectedDate ? calculateHeight(event.startedAt.toString(), event.endedAt.toString(), selectedDate) : '0',
              width: "calc(100% - 10px)" ,
              backgroundColor: event.categories?.color ?? "#fff"
              }}>{event.title}</div>
              )}
        </div>
        
      </div>
    </div>
  );
};
export default DayView;
