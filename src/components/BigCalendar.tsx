import React, { useEffect, useState } from "react";
import { dayList } from "../consts/calendar";
import { getCalendarDates } from "../libs/calendar";
import { EventItem } from "../types/common";
import { getEvents } from "../services/eventService";
import { EventType } from "@testing-library/react";

const BigCalendar: React.FC = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const [events, setEvents] = useState<EventItem[]>([]);

  const loadEvents = async () => {
    const result = await getEvents({ year: currentYear, month: currentMonth });
    setEvents(result.data);
  };
  useEffect(() => {
    loadEvents();
  }, []);
  const groupAndSortEvents = () => {
    const groupedEvents: { [key: string]: EventType[] } = {};

    // events.forEach((event) => {
    //   const dateKey = new Date(event.id).toLocaleDateString("ko-KR"); // Modified this line
    //   if (!groupedEvents[dateKey]) {
    //     groupedEvents[dateKey] = [];
    //   }
    //   groupedEvents[dateKey].push(event);
    // });

    // for (const key in groupedEvents) {
    //   groupedEvents[key].sort((a, b) => {
    //     const timeA = new Date(`1970-01-01T${a.time}`);
    //     const timeB = new Date(`1970-01-01T${b.time}`);
    //     return timeA.getTime() - timeB.getTime();
    //   });
    // }

    return groupedEvents;
  };

  const groupedAndSortedEvents = groupAndSortEvents();

  const [targetCalendarDates, setTargetCalendarDates] = useState<Date[] | null>(
    null
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    setTargetCalendarDates(null);
    const newDates: Date[] = getCalendarDates(selectedYear, selectedMonth);
    setTargetCalendarDates(newDates);
  }, [selectedMonth, selectedYear]);

  const getSecondDateClass = (date: Date): string => {
    if (date.getMonth() + 1 !== selectedMonth) {
      return "text-gray-400 bg-zinc-100";
    }
    if (date.getDay() === 6 || date.getDay() === 0) {
      return "text-red-500";
    }
    return "";
  };
  return (
    <>
      <div className="min-w-screen grid grid-cols-7 gap-1 border border-state-300">
        {dayList.map((day) => (
          <div key={day.medium} className="text-center py-2 ">
            {day.medium}
          </div>
        ))}
      </div>

      <div className="min-w-screen min-h-[1500px] grid grid-cols-7  border border-state-300">
        {targetCalendarDates?.map((date: Date, index: number) => {
          const currentDateKey = date.toLocaleDateString("ko-KR");
          const currentDateEvents =
            groupedAndSortedEvents[currentDateKey] || [];

          console.info(date.getDate());

          return (
            <div
              key={index}
              className={`text-left indent-3 py-2 border border-state-300 ${getSecondDateClass(
                date
              )}`}
            >
              {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
              {currentDateEvents.map((event: EventType, eventIndex: number) => (
                <div key={eventIndex}>
                  {/* {event.title} at {event.startedAt} */}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BigCalendar;
