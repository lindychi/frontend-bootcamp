import React from "react";

type BigCalendarProps = {
  dayList: { medium: string }[];
  targetCalendarDates: Date[] | null;
  getSecondDateClass: (date: Date) => string;
  events: { date: string; name: string; time: string }[]; // 이벤트 정보를 담을 배열
};

const BigCalendar: React.FC<BigCalendarProps> = ({
  dayList,
  targetCalendarDates,
  getSecondDateClass,
  events,
}) => {
  const getEventForDate = (
    date: Date
  ): { name: string; time: string } | null => {
    const eventForDate = events.find(
      (event) => event.date === date.toISOString().split("T")[0]
    );
    return eventForDate || null;
  };

  return (
    <>
      <div className="min-w-screen grid grid-cols-7 gap-1 border border-state-300">
        {dayList.map((day) => (
          <div key={day.medium} className="text-center py-2 ">
            {day.medium}
          </div>
        ))}
      </div>

      <div className="min-w-screen min-h-[1500px] grid grid-cols-7  border border-state-300">
        {targetCalendarDates?.map((date: Date, index: number) => (
          <div
            key={index}
            className={`text-left indent-3 py-2 border border-state-300 ${getSecondDateClass(
              date
            )}`}
          >
            {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}

            {events && (
              <div>
                {getEventForDate(date) && (
                  <div>
                    {getEventForDate(date)?.name} at{" "}
                    {getEventForDate(date)?.time}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BigCalendar;
