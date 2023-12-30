import React, { useState } from "react";

import "./App.css";

import { dayList } from "./consts/calendar";
import { getCalendarDates, getMonthString } from "./libs/calendar";

import Arrow from "./icons/Arrow";
import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";
import CalendarS from "./components/CalendarS";
import SevenDays from "./components/SevenDays";
import WeekM from "./components/WeekM";

function App() {
  const [selectedMonth, setSelectedMonth] = React.useState(12);
  const [selectedYear, setSelectedYear] = React.useState(2023);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );

  return (
    <div className="calendar flex justify-start w-[1465px] h- auto border solid rgba(157, 158, 159, 0.60)">
      <div className="sidebar flex-col w-[250px] border-r solid rgba(157, 158, 159, 0.60)">
        <div>{/* 미니캘린더*/}</div>

        {/* 미니캘린더 하단*/}
        <div className="schedule w-[250px] h-[409px] py-[10px] px-[16px] gap-[10px]">
          Upcoming events
        </div>
      </div>

      <div className="content w-[1214px]">
        {/* 상단 헤더 */}
        <div className="content_top flex w-100% h-[77px] p-[16px] justify-between ">
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
          {/* Add event */}
          <div className="right-contents flex justify-between gap-[16px] items-center">
            <div>
              <Search />
            </div>
            <div className="addEvent flex w-auto h-[35px] p-[8px] rounded bg-primary text-white text-sm gap-[4px] items-center">
              Add event <Plus />{" "}
            </div>
          </div>
        </div>

        {/* 빅달력_요일 */}
        <div className="flex w-100% border-y solid rgba(157, 158, 159, 0.60) bg-red-400">
          <div className="time w-[64px] bg-yellow-300"></div>
          <div className="weekM w-full">
            <SevenDays dayList={dayList} />
          </div>
        </div>
        <div>
          <WeekM />
        </div>

        {/* 주력 */}
        {/* <div className="flex w-100% bg-red-400">
          <div className="timeBox w-[64px] border-l text-s bg-yellow-300"></div>
          <div className="weekBox flex w-full h-[80px] bg-red-600 text-start">
            <div className="w-full border-r break-words"></div>
            <div className="w-full border-r"></div>
            <div className="w-full border-r"></div>
            <div className="w-full border-r"></div>
            <div className="w-full border-r"></div>
            <div className="w-full border-r"></div>
            <div className="w-full border-r"></div>
          </div>
        </div> */}

        {/* <div className="mediumDay flex items-center justify-between w-100% h-[24px] border solid rgba(157, 158, 159, 0.60)">
          {dayList.map(({ medium }, index) => (
            <div
              key={index}
              className="day px-[10px] mx-auto text-center text-s"
            >
              {medium}
            </div>
          ))}
        </div> */}
        {/* 빅달력_날짜    */}

        {/* 연력*/}
        <div className="flex">
          {" "}
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
