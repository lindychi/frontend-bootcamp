import React, { useState, useEffect } from "react";
import { getDayEvents } from "../services/eventService";
import { EventItem } from "../types/common";

const DayView: React.FC = () => {
  const getTodayDayOfWeek = (): string => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    return daysOfWeek[today];
  };

  const hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  const minutes: number[] = Array.from({ length: 60 }, (_, i) => i);

  const currentTime: Date = new Date();
  const currentHour: number = currentTime.getHours();
  const currentMinute: number = currentTime.getMinutes();

  const [events, setEvents] = useState<EventItem[]>([]);
  const loadEvents = async () => {
    const result = await getDayEvents({ year: 2024, month: 1, day: 5 });
    setEvents(result.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);
  return (
    <div>
      <div className="flex flex-row">
        <div className="w-[90px] h-[1440px] flex flex-col">
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
        <div>
          <div className="relative">
            <div className="w-[calc(100vw-420px)] min-h-[1440px] grid grid-cols-1 border-dashed border-2 border-state-600">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-[60px] border-dashed border-b border-state-600 last:border-b-0"
                >
                  {hour === currentHour &&
                    currentMinute >= 0 &&
                    currentMinute < 60 && (
                      <div
                        className="h-[1px] w-full bg-red-500 left-[1px] absolute"
                        style={{
                          top: `${((hour * 60 + currentMinute) / 60) * 60}px`,
                        }}
                      ></div>
                    )}
                </div>
              ))}
              <div>
                {events.map((event) => {
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
                  // 카테고리써야함

                  return (
                    <div
                      key={event.id}
                      className="absolute bg-blue-300 text-white p-2 rounded"
                      style={{
                        top: `${eventTop}px`,
                        height: `${eventHeight}px`,
                        width: `calc(100vw - 430px)`,
                        left: "5px",
                        right: "10px",
                        backgroundColor:
                          event.categories?.color || "transparent",
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
      </div>
    </div>
  );
};

export default DayView;
