import React, { useEffect, useState } from "react";
import { getCalendarDates } from "../libs/calendar";
import clsx from "clsx";
import { DateName, dayList } from "../consts/calendar";
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

  const [events, setEvents] = useState<EventItem[]>([]);
  const today = new Date();

  const loadEvents = async () => {
    // 서비스에서 선택된 날짜에 해당하는 이벤트를 가져오기
    const result = await getDayEvents({
      year: selectedYear,
      month: selectedMonth,
    });
    setEvents(result.data);
  };

  // 컴포넌트가 처음 로드될 때 이벤트를 가져오는 효과
  useEffect(() => {
    loadEvents();
  }, [selectedMonth, selectedYear]);
  // 함수를 통해

  return (
    <div>
      <div className="bg-blue-400">
        <SevenDays dayList={dayList} />
      </div>

      <div className="mediumDates  w-full h-[1000px] grid grid-cols-7">
        {/* 달력 날짜를 표시하는 부분 */}
        {targetCalendarDates.map((date: Date) => (
          <div
            key={date.getDate()} // 각 날짜에 대한 고유한 key
            className={clsx(
              // "bg-red-300",
              "inner-date",
              "p-2.5",
              "font-medium",
              "text-xs",
              "border",
              "solid",
              "rgba(157, 158, 159, 0.60)",
              {
                "text-gray-800": date.getMonth() === selectedMonth - 1,
                "text-gray-400": date.getMonth() !== selectedMonth - 1,
              }
            )}
          >
            {/* 현재 날짜를 강조하여 표시 */}
            <div
              className={clsx({
                "bg-blue-500 w-6 h-6 flex items-center justify-center rounded-full text-white":
                  date.getDate() === new Date().getDate() &&
                  date.getMonth() === new Date().getMonth(),
              })}
            >
              {date.getDate()}
            </div>

            <div className="monthEvent">
              {/* 현재 날짜에 해당하는 이벤트 필터링 */}
              {events
                .filter((event) => {
                  const eventDate = new Date(event.startedAt);
                  return (
                    eventDate.getDate() === date.getDate() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getFullYear() === date.getFullYear()
                  );
                })
                .map((event, index) => (
                  <div
                    key={event.id}
                    className="absolute truncate w-[80px]"
                    style={{
                      top: `${100 + index * 20}px`, // top 값을 동적으로 계산

                      backgroundColor:
                        event.categories?.color + "80" || "initial",
                      borderRadius: "5px",

                      zIndex: "1",
                      width: "calc((100% - 250px) / 7)",
                    }}
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
        {/* 각 날짜에 대한 루프 끝 */}
      </div>
    </div>
  );
}
