import React, { useState } from "react";
import clsx from "clsx";
import "./App.css";

import { dayList } from "./consts/calendar";
import { getCalendarDates, getMonthString } from "./libs/calendar";

import Arrow from "./icons/Arrow";
import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";

function App() {
  const [value, setValue] = useState("");
  const [selectedMonth, setSelectedMonth] = React.useState(12);
  const [selectedYear, setSelectedYear] = React.useState(2023);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );

  return (
    <div className="calendar flex justify-start w-[1465px] rounded-md h-auto border solid rgba(157, 158, 159, 0.60)">
      {/* 미니 캘린더 */}
      <div className="sidebar flex-col w-[250px] border solid rgba(157, 158, 159, 0.60)">
        <div className="month_s flex-col w-[250px] h-[47px] py-[10px] px-[16px] font-medium">
          {getMonthString(12)}
        </div>
        {/* 미니캘린더 요일 */}
        <div className="day-s flex items-center justify-between w-[250px] h-[33px] p-[10px]">
          {dayList.map(({ short }, index) => (
            <div
              key={index}
              className="day px-[5px] mx-auto text-center text-xs"
            >
              {short}
            </div>
          ))}
        </div>
        {/* 미니캘린더 날짜     */}
        <div className="calendar_s grid grid-cols-7 w-[250px] h-[218px] p-[10px]">
          {targetCalendarDates.map((date: Date) => (
            <div
              key={date.getTime()} // 각 날짜에 대한 고유한 key
              className={clsx(
                "inner-date",
                "p-[5px]",
                "font-medium",
                "text-xs",
                "text-center",
                "align-middle",
                {
                  "text-gray-800": date.getMonth() === new Date().getMonth(),
                  "text-gray-400": date.getMonth() !== new Date().getMonth(),
                }
              )}
            >
              {date.getDate()}
            </div>
          ))}
        </div>
        {/* 미니캘린더 하단*/}
        <div className="schedule w-[250px] h-[409px] py-[10px] px-[16px] gap-[10px]">
          3
        </div>
      </div>

      {/* 메인 캘린더*/}
      <div className="content">
        {/* 상단 헤더 */}
        <div className="content_top flex w-[1214px] h-[77px] p-[16px] justify-between border solid rgba(157, 158, 159, 0.60)">
          <div className="left-content flex justify-between gap-4 items-center">
            <div>
              <Hamburger />
            </div>
            <div className="Month-title flex gap-[4px] items-center">
              {/* 디쎔버 */}
              <div className="text-3xl text-center font-semibold">
                {getMonthString(12)}
              </div>
              {/* 년도 */}
              <div className="year text-3xl  text-center">{selectedYear}</div>
            </div>

            {/* Month 셀렉박스    */}
            <select
              name="calendarType"
              id=""
              className="h-[36px] border solid border-primary text-primary rounded px-1 py-1 items-center text-sm"
            >
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="week">week</option>
              <option value="day">day</option>
            </select>
            {/* <div className="flex gap-[4px] w-[75px] h-[35px] border solid border-primary text-primary rounded p-[8px] items-center text-sm">
        Month <Arrow /> 
      </div>*/}
          </div>
          {/* 오른쪽 콘텐츠       */}
          <div className="right-contents flex justify-between gap-[16px] items-center">
            <div>
              <Search />
            </div>
            <div className="addEvent flex w-auto h-[35px] p-[8px] rounded bg-primary text-white text-sm gap-[4px] items-center">
              Add event <Plus />{" "}
            </div>
          </div>
        </div>

        {/* 찐달력         */}
        <div className="day flex items-center justify-between w-100% h-[24px]">
          {dayList.map(({ medium }, index) => (
            <div
              key={index}
              className="day px-[10px] mx-auto text-center text-xs"
            >
              {medium}
            </div>
          ))}
        </div>

        <div className="dates w-[1214px] h-[923px] grid grid-cols-7 py-[3px] px-[4px]">
          {targetCalendarDates.map((date: Date) => (
            <div
              key={date.getTime()} // 각 날짜에 대한 고유한 key
              className={clsx(
                "inner-date",
                "p-[4px]",
                "font-medium",
                "text-xs",
                "border",
                "solid",
                "rgba(157, 158, 159, 0.60)",
                {
                  "bg-white": date.getMonth() === new Date().getMonth(),
                  "bg-gray-100": date.getMonth() !== new Date().getMonth(),
                }
              )}
            >
              {date.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
