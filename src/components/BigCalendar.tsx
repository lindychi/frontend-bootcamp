import React from "react";
import { dayList } from "../consts/calendar";

type BigCalendarProps = {
  dayList: { medium: string }[];
  targetCalendarDates: Date[] | null;
  getSecondDateClass: (date: Date) => string;
  events: { date: string; name: string; time: string }[];
};

const BigCalendar: React.FC<BigCalendarProps> = ({
  targetCalendarDates,
  getSecondDateClass,
  events,
}) => {
  const groupAndSortEvents = () => {
    const groupedEvents: { [key: string]: any[] } = {};
    events.forEach((event) => {
      const dateKey = event.date.split("T")[0]; // yyyy-mm-dd 형식으로 날짜 추출
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
        {targetCalendarDates?.map((date: Date, index: number) => (
          <div
            key={index}
            className={`text-left indent-3 py-2 border border-state-300 ${getSecondDateClass(
              date
            )}`}
          >
            {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}

            {groupedAndSortedEvents[date.toISOString().split("T")[0]]?.map(
              (event: any, eventIndex: number) => (
                <div key={eventIndex}>
                  {event.name} {event.time}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BigCalendar;
