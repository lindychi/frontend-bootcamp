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
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const thisWeekDates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    thisWeekDates.push(currentDate);
  }

  const slotsPerDay = 24;
  const slotHeightPercentage = 100 / slotsPerDay;

  const startHour = 0;
  const endHour = 24;

  const hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div>
      <div className="min-w-screen grid grid-cols-7 gap-1 border border-state-300 pl-20">
        {dayList.map((day, index) => {
          const date = targetCalendarDates && targetCalendarDates[index];
          return (
            <div key={day.medium} className="text-center py-2">
              <div>{date ? date.getDate() : ""}</div>
              <div>{day.medium}</div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row">
        <div className="w-[80px] h-[1920px] flex flex-col">
          {hours.map((hour) => (
            <div key={hour} className="h-[80px] text-xl text-right">
              {hour === 0
                ? null
                : hour < 12
                ? `오전 ${hour}시`
                : hour === 12
                ? "오후 12시"
                : `오후 ${hour - 12}시`}
            </div>
          ))}
        </div>
        <div>
          <div className="w-[1640px] min-h-[1940px] grid grid-cols-7 border border-state-300">
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
                  slotStartTime.setHours(startHour + Math.floor(slotIndex));

                  if (slotStartTime.getHours() >= endHour) {
                    slotStartTime.setHours(slotStartTime.getHours() - endHour);
                    slotStartTime.setDate(slotStartTime.getDate() + 1);
                  }

                  const slotEndTime = new Date(slotStartTime);
                  slotEndTime.setHours(slotStartTime.getHours() + 1);

                  const eventForSlot = events.find((event) => {
                    const eventTime = new Date(event.date);
                    return (
                      eventTime >= slotStartTime && eventTime < slotEndTime
                    );
                  });

                  return (
                    <div
                      key={slotIndex}
                      className={`text-left indent-3 py-2 border border-state-300 ${getSecondDateClass(
                        date
                      )}`}
                    >
                      {eventForSlot && (
                        <div>
                          {eventForSlot.name} {eventForSlot.time}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;
