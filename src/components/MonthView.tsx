import React, { useState, useEffect } from "react";
import { getEvents } from "../services/eventService";
import { EventItem } from "../types/common";

interface DayWithEvents {
  date: Date;
  events: EventItem[];
}

const MonthView: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  const loadEvents = async () => {
    const result = await getEvents({ year: 2024 });
    setEvents(result.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };

  const getDaysArray = (year: number, month: number): Date[] => {
    const daysInMonth = getDaysInMonth(year, month);
    return Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month - 1, i + 1)
    );
  };

  const groupEventsByDay = (events: EventItem[]): DayWithEvents[] => {
    const groupedEvents: DayWithEvents[] = [];

    events.forEach((event) => {
      const eventDate = new Date(event.startedAt);
      const dayIndex = eventDate.getDate() - 1;

      if (!groupedEvents[dayIndex]) {
        groupedEvents[dayIndex] = { date: eventDate, events: [] };
      }

      groupedEvents[dayIndex].events.push(event);
    });

    return groupedEvents;
  };

  const daysInMonth = getDaysArray(2024, 1); // 2024년 1월의 날짜 배열
  const eventsByDay = groupEventsByDay(events);

  return (
    <div className="grid grid-cols-7 gap-1">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-center">
          {day}
        </div>
      ))}
      {daysInMonth.map((day, index) => (
        <div key={index} className="text-center">
          {day.getDate()}
          {eventsByDay[index]?.events.map((event, eventIndex) => (
            <div
              key={eventIndex}
              className="bg-blue-300 text-white p-2 rounded"
            >
              {event.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MonthView;
