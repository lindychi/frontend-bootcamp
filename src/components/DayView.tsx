import React, { useState, useEffect } from "react";

const DayView: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours: number[] = Array.from({ length: 24 }, (_, i) => i);

  return (
    <>
      <div className="flex h-full">
        <div className="flex flex-col mr-2">
          {days.map((day, index) => (
            <div key={index} className="p-2 text-center">
              {day}
            </div>
          ))}
        </div>
        <div className="relative flex flex-col">
          <div className="flex flex-col-reverse justify-between h-full">
            {hours.map((hour) => (
              <div key={hour} className="text-right pr-2">
                {hour < 10 ? `0${hour}:00` : `${hour}:00`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DayView;
