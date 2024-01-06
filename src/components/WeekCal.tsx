import React from "react";
import { dayList } from "../consts/calendar";
import { DateName } from "../consts/calendar";
import SevenDays from "./SevenDays";
import clsx from "clsx";

type Props = {};

export default function WeekCal({}: Props) {
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
              className={`${day.short} w-full border-r flex flex-col`}
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
