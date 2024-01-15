import React, { useState, useEffect } from "react";
import { dayList } from "../consts/calendar";
import { getEvents } from "../services/eventService";
import { EventItem } from "../types/common";

type BigCalendarProps = {
  targetCalendarDates: Date[] | null;
  getSecondDateClass: (date: Date) => string;
};

const BigCalendar: React.FC<BigCalendarProps> = ({
  targetCalendarDates,
  getSecondDateClass,
}) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setloading] = useState<boolean>(true);

  const loadEvents = async () => {
    try {
      const result = await getEvents({
        year: currentYear,
        month: currentMonth,
      });
      setEvents(result.data);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    loadEvents();
  }, []);

  const groupAndSortEvents = () => {
    const groupedEvents: { [key: string]: EventItem[] } = {};

    events.forEach((event) => {
      const dateKey = new Date(event.startedAt).toLocaleDateString("ko-KR"); // 변경된 부분
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }
      groupedEvents[dateKey].push(event);
    });

    for (const key in groupedEvents) {
      groupedEvents[key].sort((a, b) => {
        const timeA = new Date(a.startedAt);
        const timeB = new Date(b.startedAt);
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
        {loading ? (
          <div>로딩중</div>
        ) : (
          targetCalendarDates?.map((date: Date, index: number) => {
            const currentDateKey = date.toLocaleDateString("ko-KR");
            const currentDateEvents =
              groupedAndSortedEvents[currentDateKey] || [];

            return (
              <div
                key={index}
                className={`text-left indent-3 py-2 border border-state-300 truncate w=[20px]${getSecondDateClass(
                  date
                )}`}
              >
                {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
                {currentDateEvents.map(
                  (event: EventItem, eventIndex: number) => (
                    <div key={eventIndex}>{event.title}</div>
                  )
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default BigCalendar;
