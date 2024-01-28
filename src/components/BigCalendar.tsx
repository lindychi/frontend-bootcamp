import React, { useEffect, useState } from "react";
import { dayList } from "../consts/calendar";
import { getCalendarDates } from "../libs/calendar";
import { EventItem } from "../types/common";
import { getEvents } from "../services/eventService";
import clsx from "clsx";

const BigCalendar: React.FC = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const [events, setEvents] = useState<EventItem[]>([]);
  const [targetCalendarDates, setTargetCalendarDates] = useState<Date[] | null>(
    null
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const result = await getEvents({
        year: currentYear,
        month: currentMonth,
      });
      setEvents(result.data);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

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

  const renderEventsForDate = (date: Date): JSX.Element | null => {
    const currentDateEvents = events.filter((event) => {
      const eventDate = new Date(event.startedAt);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });

    if (currentDateEvents.length === 0) {
      return null;
    }

    return (
      <ul>
        {currentDateEvents.map((event, index) => (
          <li key={index}>{event.title}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="w-[calc(100vw-420px)] grid grid-cols-7 gap-1 border border-state-300">
        {dayList.map((day) => (
          <div key={day.medium} className="text-center py-2 ">
            {day.medium}
          </div>
        ))}
      </div>

      <div className="w-[calc(100vw-420px)] min-h-screen grid grid-cols-7  border border-state-300">
        {targetCalendarDates?.map((date: Date, index: number) => {
          const currentDateKey = date.toLocaleDateString("ko-KR");
          const currentDateEvents = events.filter((event) => {
            const eventDate = new Date(event.startedAt);
            return (
              eventDate.getDate() === date.getDate() &&
              eventDate.getMonth() === date.getMonth() &&
              eventDate.getFullYear() === date.getFullYear()
            );
          });

          const cellClass = clsx(
            "text-left",
            "indent-3",
            "py-2",
            "border",
            "border-state-300",
            "h-150px",
            getSecondDateClass(date),
            "cell"
          );

          return (
            <div key={index} className={cellClass}>
              <div>
                {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
              </div>
              {renderEventsForDate(date)}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BigCalendar;
