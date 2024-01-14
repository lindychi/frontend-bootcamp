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

  const loadEvents = async () => {
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(async (day) => {
      const result = await getDayEvents({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day,
      });
      setEvents((prev) => [...prev, ...result.data]);
    });
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
      <div className="flex border-b">
        <div className="w-[64px] "></div>
        <div className="flex w-[1150px]">
          <SevenDays dayList={dayList} />
        </div>
      </div>

      <div className="flex">
        <div className="w-[64px] flex flex-col">
          {[...Array(24)].map((_, index) => (
            <div key={index} className="flex relative h-[60px]">
              <div className="timeBox w-[64px] border-r bg-transparent"></div>
              <div className="time absolute top-[50px] text-xs px-4">
                {" "}
                {index === 23
                  ? ""
                  : ("00" + ((index + 1) % 24)).slice(-2) + ":00"}
              </div>
            </div>
          ))}
        </div>
        {/* boxContainer 부분 반복 */}
        <div className="grid grid-cols-7 w-full">
          {dayList.map((day: DateName, dayIndex) => (
            <div
              key={dayIndex}
              className={`${day.short} w-full border-r flex flex-col relative`}
            >
              {[...Array(24)].map((_, index) => (
                <div key={index} className="flex relative ">
                  <div
                    className={clsx([
                      "weekBox flex w-full h-[60px] border-b text-start",
                      {
                        "bg-gray-100": dayIndex === 0 || dayIndex === 6,
                      },
                    ])}
                  ></div>
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
                      // top: '125px',
                      fontSize: "15px",
                      backgroundColor:
                        event.categories?.color + "80" || "initial",
                      borderRadius: "5px",
                      height: `${calculateEventHeight(
                        event.startedAt,
                        event.endedAt
                      )}px`,
                      zIndex: "1", // z-index 설정-다른요소들보다 위에
                    }}
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* {[...Array(24)].map((_, index) => (
          <div key={index} className="flex relative w-100% ">
            <div className="timeBox w-[64px] border-r"></div>
            <div className="time absolute top-[70px] text-xs px-4">
              {" "}
              {index === 23
                ? ""
                : ("00" + ((index + 1) % 24)).slice(-2) + ":00"}
            </div>
            <div className={`weekBox flex w-full h-[80px] border-b text-start`}>
              {dayList.map((day: DateName, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`${day.short} w-full border-r ${
                    dayIndex === 0 || dayIndex === 6 ? "bg-gray-100" : ""
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}

{
  /* <div className="flex w-100% text-center ">
    <div className="timeBox w-[64px] border-l text-s bg-yellow-300 text-xs px-5 ">0000</div>
    <div className="weekBox flex w-full h-[80px] border-b text-start">
      <div className="s w-full border-r  bg-gray-100"></div>
      <div className="m w-full border-r"></div>
      <div className="t w-full border-r"></div>
      <div className="w w-full border-r"></div>
      <div className="th w-full border-r"></div>
      <div className="s w-full border-r"></div>
      <div className="st w-full border-r bg-gray-100"></div>
    </div>
    
  </div>
</div>
)
} */
}
