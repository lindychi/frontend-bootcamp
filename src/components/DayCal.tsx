import React, { useEffect, useState } from "react";
import { getDayEvents } from "../services/eventService";
import { EventItem } from "../types/common";
import { start } from "repl";

type Props = {};

export default function DayCal({}: Props) {
  const [events, setEvents] = useState<EventItem[]>([]);

  const loadEvents = async () => {
    const result = await getDayEvents({ year: 2024, month: 1, day: 5 });
    setEvents(result.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="relative">
      <div>
        {events.map((event) => (
          <div className="absolute" style={{ top: "5px" }}>
            {event.title}
          </div>
        ))}
      </div>

      <div>
        {Array(24)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <div className="dayCal-Container  relative flex w-full">
                <div className="timeBox w-[60px] border-r border-dashed "></div>
                <div className="time absolute top-[50px] text-xs px-6">
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
// slytle = {{  top = start

// height = startend}}
