import React, { useEffect, useState } from "react";
import { getDayEvents } from "../services/eventService";
import { EventItem } from "../types/common";

type Props = {};

export default function DayCal({}: Props) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const today = new Date();

  const loadEvents = async () => {
    const result = await getDayEvents({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    });
    setEvents(result.data);
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
    const duration = endedTime.getTime() - startedTime.getTime();
    const minutes = duration / (1000 * 60);
    return minutes; // 분 단위로 높이 계산
  };

  return (
    <div>
      <div className="todo relative">
        <div>
          {events.map((event) => (
            <div
              key={event.id}
              className="absolute truncate w-[80px]"
              style={{
                top: calculateTopPosition(event.startedAt),
                left: "64px",
                fontSize: "15px",
                backgroundColor: event.categories?.color + "80" || "initial",
                borderRadius: "5px",
                height: `${calculateEventHeight(
                  event.startedAt,
                  event.endedAt
                )}px`,
                zIndex: "1", // z-index 설정-다른요소들보다 위에
                width: "calc(100% - 68px)",
              }}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>

      <div>
        {Array(24)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <div className="dayCal-Container  relative flex w-full">
                <div className="timeBox w-[60px] border-r border-dashed "></div>
                <div className="time absolute top-[50px] text-xs px-4">
                  {" "}
                  {index === 23
                    ? ""
                    : ("00" + ((index + 1) % 24)).slice(-2) + ":00"}
                </div>
                <div className="weekBox w-full h-[60px] p-5 border-b border-dashed text-start"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

//     <div>
//       <div className="dayCal-Container relative flex w-full">
//         <div className="timeBox  w-[80px] border-r bg-red-300">
//         </div>
//         <div className="time absolute top-[70px] text-xs px-6">0000</div>

//         <div className="weekBox w-full min-h-[80px] p-5 border-b text-start bg-red-500"></div>
//         </div>
//     </div>

//   );
// }

// class name= Absolute
// style = {{  top = start

// height = started}}
