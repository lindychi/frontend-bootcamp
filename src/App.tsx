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
        <div className="month_s flex-col w-[250px] h-[47px] py-[10px] px-[16px] font-medium">
          {getMonthString(12)}
        </div>
        <div className="day-s flex items-center justify-between w-[250px] h-[33px] p-[10px]">
          {dayList.map(({short},index) => ( 
            <div key={index} className="day px-[5px] mx-auto text-center text-xs">{short}
            </div>         
          ))}
        </div>
        <div className="calendar_s grid grid-cols-7 w-[250px] h-[218px] p-[10px]">
        {targetCalendarDates.map((date: Date) => (
                <div className="inner-date p-[5px] font-medium text-xs text-center align-middle">
                  {date.getDate()}
                </div> 
              ))}
        </div>
        <div className="schedule w-[250px] h-[409px] py-[10px] px-[16px] gap-[10px]">3</div>
      </div>

      <div className="content">
        <div className="content_top flex w-[1214px] h-[77px] p-[16px] justify-between border solid rgba(157, 158, 159, 0.60)">
          <div className="leftcontent flex justify-between gap-4 items-center">
            <div>< Hamburger /></div>      
            <div className="Monthtitle flex gap-[4px] items-center">
              <div className="text-3xl text-center font-semibold">{getMonthString(12)}</div>
              <div className="text-3xl text-center">2023</div>
            </div>
            <div className="flex gap-[4px] w-[75px] h-[35px] border solid border-primary text-primary rounded p-[8px] items-center text-sm">Month <Arrow /></div>
            
          </div>     
          <div className="rightcontent flex justify-between gap-[16px] items-center">
            <div><Search /></div>
            <div className="flex w-auto h-[35px] p-[8px] rounded bg-primary text-white text-sm gap-[4px] items-center">Add event <Plus /> </div>
          </div>
        </div>  
          



        <div className="day flex items-center justify-between w-100% h-[24px]">
          {dayList.map(({medium},index) => ( 
            <div key={index} className="day px-[10px] mx-auto text-center text-xs">{medium}</div>         
          ))}
        </div>
{/* mx-auto는 수평 여백을 자동으로 설정하여 내용을 가운데로 이동시키는 클래스입니다. */}

{/*             
        <div className="flex w-[1214px] h-[923px]">
          {Array.from({length: 7*6}).map(_, index) => (
            <div key={index} className="w-1/7 h-1/6 border solid rgba(157, 158, 159, 0.60)">
            </div>
          )} 
        </div>
         */}



          <div className="datebox w-[1214px] h-[923px] grid grid-cols-7 py-[3px] px-[4px] ">
              {targetCalendarDates.map((date: Date) => (
                <div className="inner-date p-[4px] font-medium text-xs border solid rgba(157, 158, 159, 0.60)">
                  {date.getDate()}
                </div> 
              ))}
          </div>







                
      </div>    
    </div>
  )
}

export default App;
