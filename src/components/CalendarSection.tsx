import React from "react";
import { getMonthString } from "../libs/calendar";
import { dayList } from "../consts/calendar";
type CalendarSectionProps = {
  selectedMonth: number;
  targetCalendarDates: Date[] | null;
  getDateClass: (date: Date) => string;
  events: { date: string; name: string; time: string }[];
};

const CalendarSection: React.FC<CalendarSectionProps> = ({
  selectedMonth,
  targetCalendarDates,
  getDateClass,
  events,
}) => {
  const today = new Date();

  const todayEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === today.getFullYear() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getDate() === today.getDate()
    );
  });

  return (
    <div className="w-[340px] h-screen border border-slate-300 p-4">
      <div className="text-2xl font-semibold mb-4 px-2 py-1">
        {getMonthString(selectedMonth)}
      </div>
      <div className="min-w-[300px] grid grid-cols-7 gap-1 ">
        {dayList.map((day) => (
          <div key={day.short} className="text-center text-sm py-2 ">
            {day.short}
          </div>
        ))}
        {targetCalendarDates?.map((date, index) => (
          <div
            key={index}
            className={`text-center text-sm py-3 ${getDateClass(date)}`}
          >
            {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
          </div>
        ))}
      </div>
      <div className="p-3">
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-2">
            {todayEvents.length > 0 ? "TODAY EVENT" : "A DAY WITH NOTHING"}
          </h3>
          {todayEvents.length > 0 ? (
            <ul className="list-disc pl-5">
              {todayEvents.map((event, index) => (
                <li key={index} className="mb-1">
                  {event.name} - {new Date(event.date).toLocaleDateString()} -{" "}
                  {event.time}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="list-disc pl-5">
              {events.map((event, index) => (
                <li key={index} className="mb-1">
                  {event.name} - {new Date(event.date).toLocaleDateString()} -{" "}
                  {event.time}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-2">일정 테이블</h3>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="border-b">
                <th className="p-2">이름</th>
                <th className="p-2">날짜</th>
                <th className="p-2">시간</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{event.name}</td>
                  <td className="p-2">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="p-2">{event.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
