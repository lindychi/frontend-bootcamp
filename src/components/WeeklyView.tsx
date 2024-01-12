import React from "react";
import { useState, useEffect } from "react";

interface CalendarEvent {
  id: number;
  title: string;
  date: string; // 날짜 형식으로 저장 (예: "2024-01-10")
  time: string; // 시간 형식으로 저장 (예: "14:00")
  // 다른 필요한 이벤트 정보들...
}

const WeeklyView: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // 주간 이벤트를 가져오는 함수 (예시)
  const fetchWeeklyEvents = () => {
    // 이 곳에서 API를 호출하거나 로컬 데이터를 가져와서 events 상태를 업데이트합니다.
    // 예시 데이터
    const sampleEvents: CalendarEvent[] = [
      { id: 1, title: "Meeting", date: "2024-01-10", time: "10:00" },
      { id: 2, title: "Gym", date: "2024-01-11", time: "15:30" },
      // 추가 이벤트들...
    ];
    setEvents(sampleEvents);
  };

  useEffect(() => {
    fetchWeeklyEvents();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const hoursOfDay = Array.from({ length: 24 }, (_, index) => {
    const hour = index; // 9부터 시작하도록 설정
    return hour;
  });

  // 주간 캘린더 UI 렌더링
  return (
    <div>
      <div className="min-w-screen grid grid-cols-7 gap-1 ml-20">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="flex-1 p-2 text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="flex flex-row">
        <div className="w-[90px] flex flex-col">
          {hoursOfDay.map((hour) => (
            <div key={hour} className="h-[80px] text-xl text-right relative">
              <div className="absolute -top-3 right-1">
                {hour < 12
                  ? `오전 ${hour}시`
                  : hour === 12
                  ? "오후 12시"
                  : `오후 ${hour - 12}시`}
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="w-[calc(100vw-420px)] grid grid-cols-7 ">
            {daysOfWeek.map((_, dayIndex) => (
              <div
                key={`col-${dayIndex}`}
                className=" border-dashed border-2 last:border-b-0"
              >
                {hoursOfDay.map((hour, hourIndex) => {
                  const currentDay = new Date("2024-01-10"); // 시작 날짜 (예시)
                  currentDay.setDate(currentDay.getDate() + dayIndex);
                  const formattedDate = currentDay.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환

                  const dailyEvents = events.filter(
                    (event) =>
                      event.date === formattedDate &&
                      event.time === `${hour}:00`
                  );

                  return (
                    <div
                      key={`cell-${hourIndex}-${dayIndex}`}
                      className="h-[80px] border-dashed border-b border-state-600 last:border-b-0"
                    >
                      {dailyEvents.map((event) => event.title)}
                      {hour === new Date().getHours() && (
                        <div
                          className="h-[1px] w-full bg-red-500 left-[1px] absolute z-10"
                          style={{
                            top: `${
                              ((hour * +new Date().getMinutes()) / 60) * 60
                            }px`,
                          }}
                        ></div>
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

export default WeeklyView;
