import React from "react";
import { dayList } from "../consts/calendar";

type WeekViewProps = {
  dayList: { medium: string }[];
  targetCalendarDates: Date[] | null;
  getSecondDateClass: (date: Date) => string;
  events: { date: string; name: string; time: string }[];
};

const WeekView: React.FC<WeekViewProps> = ({
  targetCalendarDates,
  getSecondDateClass,
  events,
}) => {
  const getEventForDate = (
    date: Date
  ): { name: string; time: string } | null => {
    const eventForDate = events.find((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
    return eventForDate || null;
  };

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const thisWeekDates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    thisWeekDates.push(currentDate);
  }

  const slotsPerDay = 16;
  const slotHeightPercentage = 100 / slotsPerDay;
  const slotDurationInHours = 24 / slotsPerDay;

  return (
    <>
      <div className="min-w-screen grid grid-cols-7 gap-1 border border-state-300">
        {dayList.map((day) => (
          <div key={day.medium} className="text-center py-2">
            {day.medium}
          </div>
        ))}
      </div>

      <div className="min-w-screen min-h-[1500px] grid grid-cols-7 border border-state-300">
        {thisWeekDates.map((date: Date, index: number) => (
          <div
            key={index}
            className="grid"
            style={{
              gridTemplateRows: `repeat(${slotsPerDay}, ${slotHeightPercentage}%)`,
            }}
          >
            {[...Array(slotsPerDay)].map((_, slotIndex) => {
              const slotStartTime = new Date(date);
              slotStartTime.setHours(
                Math.floor(slotIndex / (slotsPerDay / 24))
              );
              slotStartTime.setMinutes(0);
              const slotEndTime = new Date(date);
              slotEndTime.setHours(
                Math.floor((slotIndex + 1) / (slotsPerDay / 24))
              );
              slotEndTime.setMinutes(0);

              const eventForSlot = events.find((event) => {
                const eventTime = new Date(event.date);
                return eventTime >= slotStartTime && eventTime < slotEndTime;
              });

              return (
                <div
                  key={slotIndex}
                  className={`text-left indent-3 py-2 border border-state-300 ${getSecondDateClass(
                    date
                  )}`}
                >
                  {slotIndex % (slotsPerDay / 24) === 0 &&
                    (date.getDate() > 9
                      ? date.getDate()
                      : `0${date.getDate()}`)}

                  {eventForSlot && (
                    <div>
                      {eventForSlot.name} at {eventForSlot.time}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default WeekView;
