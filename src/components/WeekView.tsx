import React, { useState } from "react";
import { EventItem } from "../types/common";
import { getEvents } from "../services/eventService";

const WeekView: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const loadEvents = async () => {
    const result = await getEvents({ year: 2024, month: 1 });
    setEvents(result.data);
  };
  const getTimeSlot = (event: EventItem): string => {
    // Calculate time slot string for display
    const startTime = event.startedAt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = event.endedAt
      ? event.endedAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
    return `${startTime} - ${endTime}`;
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const hoursOfDay: number[] = Array.from({ length: 24 }).map(
    (_, index) => index
  );

  return (
    <div>
      <div className="min-w-screen grid grid-cols-7 gap-1 ml-20">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center py-2 ">
            {day}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Left: Time slots */}
        <div className="w-[90px] flex flex-col">
          {hoursOfDay.map((hour) => (
            <div key={hour} className="h-[83px] text-xl text-right relative">
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
        {/* Calendar grid */}
        <div className="w-[calc(100vw-420px)]">
          <div className="grid grid-cols-7 ">
            {daysOfWeek.map((_, dayIndex) =>
              hoursOfDay.map((_, hourIndex) => (
                <div
                  key={`${dayIndex}-${hourIndex}`}
                  className=" border-dashed border-2 border-gray-200  p-10
                "
                >
                  {events.map((event) => {
                    const eventStart = event.startedAt.getDay();
                    const eventEnd = event.endedAt?.getDay();
                    const eventHour = event.startedAt.getHours();

                    if (eventStart === dayIndex && eventHour === hourIndex) {
                      return (
                        <div
                          key={event.id}
                          className={`bg-${event.categories?.color}-100 rounded-md p-1`}
                        >
                          <p>{event.title}</p>
                          <p>{getTimeSlot(event)}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;
