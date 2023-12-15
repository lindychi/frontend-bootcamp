import React from "react";

type BigCalendarProps = {
  dayList: { medium: string }[];
  targetCalendarDates: Date[] | null;
  getSecondDateClass: (date: Date) => string;
};

const BigCalendar: React.FC<BigCalendarProps> = ({
  dayList,
  targetCalendarDates,
  getSecondDateClass,
}) => {
  return (
    <>
      <div className="min-w-screen min-h-[1500px] grid grid-cols-7  border border-state-300">
        {targetCalendarDates?.map((date: Date, index: number) => (
          <div
            key={index}
            className={`text-left indent-3 py-2 border border-state-300 ${getSecondDateClass(
              date
            )}`}
          >
            {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
          </div>
        ))}
      </div>
    </>
  );
};

export default BigCalendar;
