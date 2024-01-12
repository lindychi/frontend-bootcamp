import React, { useState, useEffect } from "react";
import { getEvents } from "../services/eventService";
import { EventItem } from "../types/common";

const DayView: React.FC = () => {
  const hours: number[] = Array.from({ length: 24 }, (_, i) => i);

  const [events, setEvents] = useState<EventItem[]>([]);

  const loadEvents = async () => {
    const result = await getEvents({ year: 2024 });
    setEvents(result.data);
  };
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  useEffect(() => {
    loadEvents();
  }, []);

  return (
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
        <div className="w-[calc(100vw-420px)] grid grid-cols-1 border-dashed border-2 border-state-600">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-[80px] border-dashed border-b border-state-600 last:border-b-0"
            >
              {hour === new Date().getHours() && (
                <div
                  className="h-[1px] w-full bg-red-500 left-[1px] absolute z-10"
                  style={{
                    top: `${
                      ((hour * 80 + new Date().getMinutes()) / 60) * 60
                    }px`,
                  }}
                ></div>
              )}
            </div>
          ))}
          <div>
            {events
              .filter((event) => {
                const eventDate = new Date(event.startedAt);
                return (
                  eventDate.getFullYear() === currentYear &&
                  eventDate.getMonth() + 1 === currentMonth &&
                  eventDate.getDate() === currentDay
                );
              })
              .map((event) => {
                const startEventTime = new Date(event.startedAt);
                const endEventTime = event.endedAt
                  ? new Date(event.endedAt)
                  : new Date();
                const startHour = startEventTime.getHours();
                const startMinute = startEventTime.getMinutes();
                const endHour = endEventTime.getHours();
                const endMinute = endEventTime.getMinutes();

                const eventTop = ((startHour * 60 + startMinute) / 60) * 60;
                const eventHeight =
                  ((endHour * 60 + endMinute) / 60) * 60 - eventTop;

                return (
                  <div
                    key={event.id}
                    className=" bg-blue-300 text-white p-2 rounded absolute z-0"
                    style={{
                      top: `${eventTop}px`,
                      height: `${eventHeight}px`,
                      width: `calc(100vw - 430px)`,
                      left: "5px",
                      right: "10px",
                      backgroundColor: event.categories?.color || "transparent",
                    }}
                  >
                    {event.title}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
