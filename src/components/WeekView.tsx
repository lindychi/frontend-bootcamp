import React, { useState, useEffect, useRef } from "react";
import { getEvents } from "../services/eventService";
import { EventItem } from "../types/common";
import EditEvent from "./EditEvent";

interface DayOfWeek {
  day: string;
  date: Date;
}

const WeekView: React.FC = () => {
  const hours: number[] = Array.from({ length: 24 }, (_, index) => index);

  const [events, setEvents] = useState<EventItem[]>([]);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const loadEvents = async () => {
    const result = await getEvents({ year: currentYear, month: currentMonth });
    setEvents(result.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  function getStartWeekday(date: Date) {
    let current_date = new Date(date);
    let weekDay = current_date.getDay();
    current_date.setDate(current_date.getDate() - weekDay);
    return new Date(current_date);
  }

  function getDaysOfWeek() {
    let daysOfWeek: DayOfWeek[] = [];
    let startWeekDay = getStartWeekday(new Date());
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    days.forEach(function (day, index) {
      let currentDate = new Date(startWeekDay); // 현재 날짜를 기준으로 설정
      currentDate.setDate(startWeekDay.getDate() + index);
      daysOfWeek.push({
        day: day,
        date: currentDate,
      });
    });
    return daysOfWeek;
  }

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
  const [isOpen, setIsOpen] = React.useState(false);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [event, setEvent] = React.useState<EventItem>({} as EventItem);
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
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleEventAdded = () => {};
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
                        let eventHeight =
                          ((endHour * 80 + endMinute) / 60) * 60 -
                          ((startHour * 80 + startMinute) / 60) * 60;
                        let endEventHeight =
                          ((endHour * 80 + endMinute) / 60) * 60;
                        const isMultiDayEvent =
                          startEventTime.getDate() !== endEventTime.getDate();

                        if (isMultiDayEvent) {
                          const currentDayEndHour = 23;
                          const currentDayEndMinute = 59;
                          const currentDayEndTime =
                            (currentDayEndHour * 60 + currentDayEndMinute) / 60;
                          const currentDayHeight =
                            ((currentDayEndTime * 80) / 60) * 60 -
                            ((startHour * 80 + startMinute) / 60) * 60;
                          const currentDayStartHour = -1520;
                          const currentDayStartMinute = 1;
                          const currentDayStartTime =
                            (currentDayStartHour * 60 + currentDayStartMinute) /
                            60;
                          const endEventTop = currentDayStartTime;

                          return (
                            <>
                              <div
                                key={`${event.id}-${eventIndex}`}
                                className={`bg-blue-300 text-white p-2 rounded absolute z-20`}
                                style={{
                                  top: `${eventTop}px`,
                                  height: `${currentDayHeight}px`,
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
                                  <button
                                    onClick={() => handleDeleteEvent(event)}
                                  >
                                    삭제
                                  </button>
                                  <button
                                    onClick={() => handleEditEvent(event)}
                                  >
                                    편집
                                  </button>
                                </div>
                              </div>

                              <div
                                key={`${event.id}-${eventIndex}-end`}
                                className={`bg-blue-300 text-white p-2 rounded absolute z-20`}
                                style={{
                                  top: `${endEventTop}px`,
                                  height: `${endEventHeight}px`,
                                  left: "calc(100% + 5px)",
                                  width: "110px",
                                  backgroundColor:
                                    event.categories?.color || "transparent",
                                }}
                                onClick={() => handleEventClick(event)}
                              >
                                {event.title}
                                <div className="flex flex-row">
                                  <button
                                    onClick={() => handleDeleteEvent(event)}
                                  >
                                    삭제
                                  </button>
                                  <button
                                    onClick={() => handleEditEvent(event)}
                                  >
                                    편집
                                  </button>
                                </div>
                              </div>
                            </>
                          );
                        } else {
                          return (
                            <div
                              key={`${event.id}-${eventIndex}`}
                              className={`bg-blue-300 text-white p-2 rounded absolute z-20`}
                              style={{
                                top: `${eventTop}px`,
                                height: `${eventHeight}px`,
                                left: "5px",
                                right: "10px",
                                backgroundColor:
                                  event.categories?.color || "transparent",
                              }}
                              onClick={(e) => handleClickEvent(e, event)}
                            >
                              {event.title}
                            </div>
                          );
                        }
                      }
                    )}

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
          {isOpen && (
            <div className="fixed  bg-red-300" style={{ left, top }}>
              제목: {event?.title}
              <EditEvent onClose={closeModal} eventItem={event} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
