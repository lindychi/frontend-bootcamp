import React, { useState } from "react";

import "./App.css";

import { dayList } from "./consts/calendar";
import { getCalendarDates, getMonthString } from "./libs/calendar";

import Arrow from "./icons/Arrow";
import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";
import SevenDays from "./Components/SevenDays";

import WeekCal from "./Components/WeekCal";
import CalendarS from "./Components/CalendarS";
import MonthCal from "./Components/MonthCal";
import YearCal from "./Components/YearCal";
import DayCal from "./Components/DayCal";

function App() {
  const [selectedMonth, setSelectedMonth] = React.useState(1);
  const [selectedYear, setSelectedYear] = React.useState(2024);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );

  const [selectedOption, setSelectedOption] = useState("month"); // Track selected option

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="calendar flex justify-start w-[1465px] h-[auto] border solid rgba(157, 158, 159, 0.60)">
      <div className="sidebar flex-col w-[250px] border-r solid rgba(157, 158, 159, 0.60)">
        {/* 미니캘린더 */}
        <div>
          <CalendarS
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            dayList={dayList}
          />
        </div>

        {/* 미니캘린더 하단*/}
        <div className="schedule w-[250px] h-[409px] py-[10px] px-[16px] gap-[10px]">
          Upcoming events
        </div>
      </div>

      <div className="content w-[1214px]">
        {/* 상단 헤더 */}
        <div className="content_top flex w-100% h-[77px] p-[16px] justify-between border-b ">
          <div className="left-content flex justify-between gap-4 items-center">
            <div>
              <Hamburger />
            </div>
            <div className="Month-title flex gap-[4px] items-center">
              {/* 월 */}
              <div className="text-3xl text-center font-semibold">
                {getMonthString(1)}
              </div>
              {/* 년도 */}
              <div className="year text-3xl  text-center">{selectedYear}</div>
            </div>

            {/* Month 셀렉박스*/}
            <div className="custom-select">
              <select
                name="calendarType"
                onChange={handleChange} //이 부분 추가
                className="h-[36px] border solid border-primary text-primary rounded px-3 items-center text-sm"
              >
                <option value="month">Month</option>
                <option value="year">Year</option>
                <option value="week">week</option>
                <option value="day">day</option>
              </select>
            </div>
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

        {/* 선택된 옵션에 따라 조건부 렌더링 */}
        <div>
          {selectedOption === "month" && <MonthCal />}
          {selectedOption === "year" && <YearCal />}
          {selectedOption === "week" && <WeekCal />}
          {selectedOption === "day" && <DayCal />}
        </div>

        {/* 일력 */}
        {/* {Array.from({ length: 24 }, (_, index) => (
          <div key={index} className="dayCal-Container flex">
            <div className="timeBox flex-col w-[80px] text-s px-5 border-r bg-red-200 text-xs">
              0000
            </div>
            <div className="weekBox w-full min-h-[80px] p-5 border-b text-start">
              Lorem ipsum dolor sit met consectetur
            </div>
          </div>
        ))} */}

        {/* 연력 */}
        {/* <div className=" px-10 py-">
          <div className="calendar_s flex flex-wrap justify-around w-100%">
            {monthsArray.map((month) => (
              <div key={month}>
                <CalendarS
                  selectedMonth={month}
                  selectedYear={selectedYear}
                  dayList={dayList}
                />
              </div>
            ))}
          </div>
        </div> */}

        {/* <div>
          <CalendarS selectedMonth={selectedMonth} selectedYear=
        {selectedYear} dayList={dayList} />
        </div> */}

        {/* 빅달력_요일 */}
        {/* <div className="flex w-100% border-y solid rgba(157, 158, 159, 0.60) bg-red-400">
          <div className="time w-[64px] bg-yellow-300"></div>
          <div className="weekM w-full">
            <SevenDays dayList={dayList} />
          </div>
        </div>
        <div>
          {Array(16)
            .fill(null)
            .map((_, index) => (
              <WeekCalendar key={index} />
            ))}
        </div> */}

        {/* 
        <div className="mediumDay flex items-center justify-between w-100% h-[24px] border solid rgba(157, 158, 159, 0.60)">
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
      </div>
    </div>
  );
}

export default App;
