import React, { useState, useEffect } from "react";
import { getEvents } from "../services/eventService";
import { EventItem } from "../types/common";

interface DayOfWeek {
  day: string;
  date: Date;
}

const WeekView: React.FC = () => {
  const hours: number[] = Array.from({ length: 24 }, (_, index) => index);

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

  function getStartWeekday(date: Date) {
    let current_date = date;
    let weekDay = current_date.getDay();
    current_date.setDate(current_date.getDate() - weekDay);
    return new Date(current_date);
  }

  function getDaysOfWeek() {
    let daysOfWeek: DayOfWeek[] = [];
    let startWeekDay = getStartWeekday(new Date());
    days.forEach(function (day, index) {
      let currentDate = new Date();
      currentDate.setDate(startWeekDay.getDate() + index);
      daysOfWeek.push({
        day: day,
        date: currentDate,
      });
    });
    return daysOfWeek;
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysOfWeek = getDaysOfWeek();

  const eventsForWeek = (targetDate: Date, hour: number): EventItem[] => {
    return events.filter((event) => {
      const eventDate = new Date(event.startedAt);
      return (
        eventDate.getHours() === hour &&
        eventDate.getDate() === targetDate.getDate()
      );
    });
  };

  const handleEventClick = (clickedEvent: EventItem) => {
    console.log(`Clicked Event: ${clickedEvent.title}`);
  };

  const handleDeleteEvent = async (clickedEvent: EventItem) => {
    try {
      // Handle delete event logic here
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  const handleEditEvent = (clickedEvent: EventItem) => {
    // Handle edit event logic here
  };

  return (
    <div>
      <div className="min-w-screen grid grid-cols-7 gap-1 ml-20">
        {daysOfWeek.map((dayOfWeek) => (
          <div key={dayOfWeek.day} className="text-center">
            <div></div>
            <div>{dayOfWeek.day}</div>
          </div>
        ))}
      </div>
      <div className="min-w-screen grid grid-cols-7 gap-1 ml-20">
        {daysOfWeek.map((dayOfWeek) => {
          const targetDate = dayOfWeek.date;
          const formattedDate = targetDate
            .getDate()
            .toString()
            .padStart(2, "0");

          return (
            <div key={dayOfWeek.day} className="text-center">
              {formattedDate}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row">
        <div className="w-[90px] flex flex-col">
          {hours.map((hour) => (
            <div key={hour} className="h-[80px] text-xl text-right relative">
              <div className="absolute -top-3 right-1">
                {hour === 0
                  ? null
                  : hour < 12
                  ? `오전 ${hour}시`
                  : hour === 12
                  ? "오후 12시"
                  : `오후 ${hour - 12}시`}
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="w-[calc(100vw-420px)] min-h-screen grid grid-cols-7 ">
            {daysOfWeek.map((dayOfWeek, index) => (
              <div
                key={`col-${index}`}
                className="border-dashed border-2 last:border-b-0"
              >
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-[80px] border-dashed border-b border-state-600 last:border-b-0 relative "
                  >
                    {eventsForWeek(dayOfWeek.date, hour).map(
                      (event, eventIndex) => {
                        const startEventTime = new Date(event.startedAt);
                        const endEventTime = event.endedAt
                          ? new Date(event.endedAt)
                          : new Date();
                        const startHour = startEventTime.getHours();
                        const startMinute = startEventTime.getMinutes();
                        const endHour = endEventTime.getHours();
                        const endMinute = endEventTime.getMinutes();

                        const eventTop =
                          ((startHour * 1 + startMinute) / 60) * 60;
                        const eventHeight =
                          ((endHour * 80 + endMinute) / 60) * 60 -
                          ((startHour * 80 + startMinute) / 60) * 60;

                        const selectedDayStart = new Date(
                          dayOfWeek.date.getFullYear(),
                          dayOfWeek.date.getMonth(),
                          dayOfWeek.date.getDate(),
                          0,
                          0,
                          0,
                          0
                        );

                        const selectedDayEnd = new Date(
                          dayOfWeek.date.getFullYear(),
                          dayOfWeek.date.getMonth(),
                          dayOfWeek.date.getDate(),
                          23,
                          59,
                          59,
                          999
                        );

                        const isCrossDay =
                          startEventTime < selectedDayStart ||
                          endEventTime > selectedDayEnd;

                        return (
                          <div
                            key={`${event.id}-${eventIndex}`}
                            className={`bg-blue-300 text-white p-2 rounded absolute z-20 ${
                              isCrossDay ? "cross-day-event" : ""
                            }`}
                            style={{
                              top: `${eventTop}px`,
                              height: `${eventHeight}px`,
                              left: "5px",
                              right: "10px",
                              backgroundColor:
                                event.categories?.color || "transparent",
                            }}
                            onClick={() => handleEventClick(event)}
                          >
                            {event.title}
                            {JSON.stringify(event.endedAt)}
                            <div className="flex flex-row ">
                              <button onClick={() => handleDeleteEvent(event)}>
                                삭제
                              </button>
                              <button onClick={() => handleEditEvent(event)}>
                                편집
                              </button>
                            </div>
                          </div>
                        );
                      }
                    )}

                    {/* Handle events that extend beyond a day */}
                    {hour === new Date().getHours() && (
                      <div
                        className="h-[1px] w-full bg-red-500 left-[1px] absolute z-30"
                        style={{
                          top: `${((hour * 1) / 60) * 60}px`,
                        }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;
