import React from "react";
import clsx from "clsx";
import "./App.css";

import { dayList } from "./consts/calendar";

import { getCalendarDates, getMonthString } from "./libs/calendar";

import Arrow from "./icons/Arrow";
import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";

function App() {
  const [selectedMonth, setSelectedMonth] = React.useState(12);
  const [selectedYear, setSelectedYear] = React.useState(2023);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );
  

  return (
    <div className="calendar flex justify-start w-[1465px]  rounded-md h-auto border solid rgba(157, 158, 159, 0.60)">
      <div className="sidebar flex-col w-[250px] border solid rgba(157, 158, 159, 0.60)">
        <div className="month_s flex-col w-[250px] h-[47px] py-[10px] px-[16px]">JANUDXKdlka</div>
        <div className="calendar_s w-[250px] h-[218px] p-[10px]  border solid rgba(157, 158, 159, 0.60)">2</div>
        <div className="schedule w-[250px] h-[409px] py-[10px] px-[16px] gap-[10px]">3</div>
      </div>

      <div className="content">
        <div className="content_top flex w-[1214px] h-[77px] p-[16px] justify-between border solid rgba(157, 158, 159, 0.60)">
          <div className="leftcolumn flex justify-between">
            <div className="Monthtitle">Jan</div>
              <div>< Hamburger /></div>            
              <div>month</div>
          </div>     
          <div className="rightcolumn flex justify-between gap-[16px]">
            <div>돋보기</div>
            <div>Add event</div>
          </div>
        </div>  
          

        <div className="weeks flex justify-between">
          <p>sun</p>
          <p>sun</p>
          <p>sun</p>
          <p>sun</p>
          <p>sun</p>
          <p>sun</p>
          <p>sun</p>
          
        </div>
            <div className="days">일</div>
      </div>    
    </div>
  )
}

export default App;
