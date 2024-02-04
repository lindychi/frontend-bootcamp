// div에 onClick 집어넣기. 레퍼런스=ui를 역으로 알아내는것.

import React, { useState, useEffect } from "react";
import { getEvents } from "../services/eventService";
import { EventItem } from "../types/common";
import { Console } from "console";

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

  const [isOpen, setIsOpen] = React.useState(false);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [event, setEvent] = React.useState<EventItem>();
  const handleClickEvent = (
    e: React.MouseEvent<HTMLDivElement>,
    data: EventItem
  ) => {
    const position = (e.target as any).getBoundingClientRect();

    console.log(position);
    setEvent(data);
    setIsOpen(true);
    setLeft(position.left);
    setTop(position.top);
  };
  // data: ConflictEventItem

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
      <div className="relative ">
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

                const eventTop = ((startHour * 80 + startMinute) / 60) * 60;
                const eventHeight =
                  ((endHour * 80 + endMinute) / 60) * 60 - eventTop;

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
                    onClick={(e) => handleClickEvent(e, event)}
                  >
                    {event.title}
                  </div>
                );
              })}
          </div>
          {isOpen && (
            <div className="fixed  bg-red-300" style={{ left, top }}>
              제목: {event?.title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayView;
