import React, { useEffect, useState } from "react";
import { dayList } from "../consts/calendar";
import { DateName } from "../consts/calendar";
import SevenDays from "./SevenDays";
import clsx from "clsx";
import { EventItem } from "../types/common";
import { getDayEvents } from "../services/eventService";

type Props = {};

export default function WeekCal({}: Props) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const today = new Date();
  const currentHours = today.getHours();
  const currentMinutes = today.getMinutes();
  const currentTime = currentHours * 60 + currentMinutes; // 현재 시간을 분 단위로 계산


  const loadEvents = async () => {
    // 오늘 날짜(today)를 기준으로 이번 주의 첫 번째 날을 찾습니다.
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // 이번 주의 일요일로 설정

   // 7일 동안의 이벤트를 가져오기 위해 반복문 사용
   for (let i = 0; i < 7; i++) {
    // i일 후의 날짜를 계산
    const nextDay = new Date(startOfWeek);
    nextDay.setDate(startOfWeek.getDate() + i);
    

    // getDayEvents를 사용하여 해당 날짜의 이벤트 가져오기
    const result = await getDayEvents({
      year: nextDay.getFullYear(),
      month: nextDay.getMonth() + 1,
      day: nextDay.getDate(),
    });

    // 현재 이벤트 상태에 새로운 이벤트 추가
    setEvents((prev) => [...prev, ...result.data]);
  }
};

  useEffect(() => {
    loadEvents();
  }, []);
  // 함수를 통해 top 위치 계산
  const calculateTopPosition = (startedAt: Date) => {
    const startedTime = new Date(startedAt);
    const hours = startedTime.getHours();
    const minutes = startedTime.getMinutes();
    
    return hours * 60 + minutes;
  };

  const calculateEventHeight = (startedAt: Date, endedAt: Date | undefined) => {
    if (!endedAt) {
      return 0; // 종료 시간이 없으면 높이 0
    }
    const startedTime = new Date(startedAt);
    const endedTime = new Date(endedAt);

    // 종료 시간이 이벤트가 시작한 날짜와 동일하면 종료 시간을 유지하고, 그렇지 않으면 23:59:59로 설정
    const checkMaxEndedTime =
      endedTime.getDate() === startedTime.getDate()
        ? endedTime
        : new Date(
            startedTime.getFullYear(),
            startedTime.getMonth(),
            startedTime.getDate(),
            23,
            59,
            59
          );
    const duration = checkMaxEndedTime.getTime() - startedTime.getTime();
    const minutes = duration / (1000 * 60);
    return minutes; // 분 단위로 높이 계산
  };
  return (
    <div>
      {/* 요일 표시 */}
      <div className="flex border-b">
        <div className="w-[64px] "></div>
        <div className="flex w-full">
          <SevenDays dayList={dayList} />
        </div>
      </div>

      {/* 시간과 이벤트 표시 영역 */}
      <div className="flex">
        <div className="w-[64px] flex flex-col">
          {[...Array(24)].map((_, index) => (
            <div key={index} className="flex relative h-[60px]">
              <div className="timeBox w-[64px] border-r bg-transparent"></div>
              <div className="time absolute top-[60px] text-xs px-4">
                {" "}
                {index === 23
                  ? ""
                  : ("00" + ((index + 1) % 24)).slice(-2) + ":00"}
              </div>
            </div>
          ))}
        </div>
         {/* 각 요일의 이벤트 표시 영역 */}
        <div className="grid grid-cols-7 w-full">
          {dayList.map((day: DateName, dayIndex) => (
            <div
              key={dayIndex}
              className={`${day.short} w-full border-r flex flex-col relative`}
            >
               {/* 시간 표시 상자와 이벤트 박스 표시 */}
              {[...Array(24)].map((_, index) => (
                <div key={index} className="flex relative ">
                  {/* 일간 이벤트 표시 */}
                  <div
                    className={clsx([
                      "weekBox flex w-full h-[60px] border-b text-start",
                      {
                        "bg-gray-100": dayIndex === 0 || dayIndex === 6,
                        
                      },
                    ])}
                  ></div>

                    {/* 현재 시간에만 실선 표시 */}
                  {currentTime >= index * 60 &&
                  currentTime < (index + 1) * 60 ? (
                    <div
                      style={{
                        borderBottom: "2px solid #585858",
                        width: "100%",
                        position: "absolute",
                        top: `${
                          ((currentHours - index) % 24) * 60 +
                          currentMinutes
                        }px`,
                      }}
                    ></div>
                  ) : null}


                  {dayIndex === today.getDay() && currentTime >= index * 60 &&
                        currentTime < (index + 1) * 60 ? (
                          <div
                            style={{
                              borderBottom: `4px solid black`,
                              width: "100%",
                              position: "absolute",
                              top: `${
                                ((currentHours - index) % 24) * 60 + currentMinutes
                              }px`,
                            }}
                          ></div>
                        ) : null}
                </div>
              ))}

              {events
                .filter((event) => {
                  return new Date(event.startedAt).getDay() === dayIndex;
                })
                .map((event) => (
                  <div
                    key={event.id}
                    className="absolute truncate w-full"
                    style={{
                      top: calculateTopPosition(event.startedAt) + 25,
                      fontSize: "12px",
                      backgroundColor:
                        event.categories?.color + "80" || "initial",
                      borderRadius: "5px",
                      height: `${calculateEventHeight(
                        event.startedAt,
                        event.endedAt
                      )}px`,
                      zIndex: "1",
                      padding: "4px", // 내부 간격 설정
                    }}
                  >
                    <div className="flex justify-between">
                    <div>{event.title} </div>
                    <div>
                      {new Date(event.startedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false, // 오전/오후 표시하지 않음
                      })}
                    </div>
                    </div>
                  </div>
                  
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

