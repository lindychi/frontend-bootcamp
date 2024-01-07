import React from "react";
import { dayList } from "../consts/calendar";

type EventType = {
  date: string;
  name: string;
  time: string;
  endTime: string;
};

type BigCalendarProps = {
  targetCalendarDates: Date[] | null;
  getSecondDateClass: (date: Date) => string;
  events: EventType[];
};

const BigCalendar: React.FC<BigCalendarProps> = ({
  targetCalendarDates,
  getSecondDateClass,
  events,
}) => {
  const groupAndSortEvents = () => {
    const groupedEvents: { [key: string]: EventType[] } = {};

    events.forEach((event) => {
      const dateKey = new Date(event.date).toLocaleDateString("ko-KR"); // Modified this line
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }
      groupedEvents[dateKey].push(event);
    });

    for (const key in groupedEvents) {
      groupedEvents[key].sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.time}`);
        const timeB = new Date(`1970-01-01T${b.time}`);
        return timeA.getTime() - timeB.getTime();
      });
    }

    return groupedEvents;
  };

  const groupedAndSortedEvents = groupAndSortEvents();

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
                  {event.name} at {event.time}
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
