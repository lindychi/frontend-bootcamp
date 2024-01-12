import React, { useState } from "react";

import "./App.css";

import { dayList } from "./consts/calendar";
import { getCalendarDates, getMonthString } from "./libs/calendar";

import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";

import WeekCal from "./components/WeekCal";
import CalendarS from "./components/CalendarS";
import MonthCal from "./components/MonthCal";
import YearCal from "./components/YearCal";
import DayCal from "./components/DayCal";


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
    <div className="calendar flex justify-start w-100wm h-[auto]  border solid rgba(157, 158, 159, 0.60)">
      <div className="sidebar flex-col w-[250px] border-r solid rgba(157, 158, 159, 0.60)">
        {/* 미니캘린더 */}
        <div>
          <CalendarS
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            dayList={dayList}
          />
        </div>

        {/* 할일flex */}
        <div className="todoList w-[250px] min-h-[100px] py-[10px] px-[16px] gap-[10px]  bg-red-400">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
              <div className="text-sm pl-2 pt-0.5">일상</div>
            </div>
            <button className=" font-medium">+</button>
          </div>
        </div>
      </div>

      <div className="content w-full">
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
      </div>
    </div>
  );
}

export default App;
