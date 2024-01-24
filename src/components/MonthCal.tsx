import React, { useEffect, useState } from "react";
import { getCalendarDates } from "../libs/calendar";
import clsx from "clsx";
import { dayList } from "../consts/calendar";
import SevenDays from "./SevenDays";
import { getDayEvents } from "../services/eventService";
import { EventItem } from "../types/common";

type Props = {};

export default function MonthCal({}: Props) {
  const [selectedMonth, setSelectedMonth] = React.useState(1);
  const [selectedYear, setSelectedYear] = React.useState(2024);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );
  const today = new Date();
  const [events, setEvents] = useState<EventItem[]>([]);

  


  // 서버에서 이벤트 데이터를 가져오는 함수
  const loadEvents = async () => {
    const result = await getDayEvents({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      // day: today.getDate(),
    });
    setEvents(result.data);
  };

  // 컴포넌트가 마운트될 때 이벤트 데이터를 로드
  useEffect(() => {
    loadEvents();
  }, []);
    



  return (
    <div>
      
      <div className="SevenDays">
        <SevenDays dayList={dayList} />
      </div>
      <div className="mediumDates w-full h-[923px] grid grid-cols-7">
        {targetCalendarDates.map((date: Date) => (
          <div
            key={date.getDate()} // 각 날짜에 대한 고유한 key
            className={clsx(
              "inner-date",
              "p-2.5",
              "font-medium",
              "text-xs",
              "border",
              "solid",
              "#f0f0f0",
              {
                "text-gray-800": date.getMonth() === selectedMonth - 1,
                "text-gray-400": date.getMonth() !== selectedMonth - 1,
              }
            )}
          >

        <div className="todo relative">
        {/* 이벤트 목록을 표시 */}
        <div>
          {events.map((event) => (
            
            <div
              key={event.id}
              className="absolute truncate w-[80px]"
              style={{
                top: "100px",
                left: "64px",
                fontSize: "10px",
                // backgroundColor: event.categories?.color + "80" || "initial",
                borderRadius: "5px",
                height: "00px",
                zIndex: "1", // z-index 설정-다른요소들보다 
                width: "calc(100% - 68px)",
              }}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>

                





              

            <div
              className={clsx({
                "bg-blue-500 w-6 h-6 flex items-center justify-center rounded-full text-white":
                  date.getDate() === new Date().getDate() &&
                  date.getMonth() === new Date().getMonth(),
              })}
            >
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}