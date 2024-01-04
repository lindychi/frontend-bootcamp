import React, { useState, useEffect } from "react";

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
  const minutesPerHour: number = 60;
  const totalSlots: number = hours.length * minutesPerHour;

  const currentTime: Date = new Date();
  const currentHour: number = currentTime.getHours();
  const currentMinute: number = currentTime.getMinutes();
  const currentSlot: number = currentHour * minutesPerHour + currentMinute;

  return (
    <div>
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
          <div className="relative">
            <div className="w-[1640px] min-h-[1940px] grid grid-cols-1 border-dashed border-2 border-state-600">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-[80px] border-dashed border-b border-state-600 last:border-b-0 relative"
                >
                  {hour === currentHour && (
                    <div
                      className="h-[1px] w-full bg-red-500 absolute top-0 left-[1px]"
                      style={{
                        top: `${(currentMinute / 60) * 80}px`,
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
