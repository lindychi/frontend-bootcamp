import React from "react";
import clsx from "clsx";
import "./App.css";
import "./consts/style.css";

import { dayList } from "./consts/calendar";

import { getCalendarDates, getMonthString } from "./libs/calendar";

import Arrow from "./icons/Arrow";
import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";



function App() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = React.useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = React.useState(today.getFullYear());
  const targetCalendarDates: Date[] = getCalendarDates(selectedYear, selectedMonth);

  return <div className="flex flex-row outer-box">
<div className="w-[250px] h-min-[1024px] p-3">  
  
 <div className=" p-[10px] grid gap-2.5">
   <div className="items-center  px-[6px] text-xl grid justify-start"> {getMonthString(selectedMonth)}</div> 
   <div className="grid grid-cols-7 text-[10px] "> {dayList.map((day, index) => (<div className="w-[26px] h-[25px]" key={index}>{day.short}  </div>))} </div>  
   <div className="grid grid-cols-7 text-[10px] "> {targetCalendarDates.map((date: Date, index) => {
              const isCurrentMonth =
                date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
              const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
               
              
              return (
                <div
                key={index}
                className={clsx('w-[30px] h-[33px] grid justify-center items-center', {
                  'bg-primary text-white rounded-full': isToday,
                  'text-black': !isToday && isCurrentMonth,
                  'text-zinc-500': !isToday && !isCurrentMonth,
                })}
                >
                  {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
                </div>
              );
            })}
       </div>   
  </div> 


</div>  
   


<div className="w-[1214px] outer-box ">
   <div className="flex flex-row place-content-between items-center p-4"> 
     <div className="flex flex-row items-center gap-4 ">
      <div>< Hamburger /></div>
      <div className="text-[30px] font-bold">{getMonthString(12)} </div>
      <div className="text-[30px]"> {selectedYear}</div>
      <div className="flex flex-row border-primary  border-solid border-[1px]  p-2 gap-1 rounded">
        <div>Month</div>
        <div><Arrow /></div>
      </div>
     </div>
     <div className="flex flex-row items-center gap-4"> 
      <div><Search /></div>
      <div className="flex flex-row bg-primary items-center text-white p-2 gap-2 rounded">
        <div>Add event</div>
        <div> <Plus/></div>
        </div>

     </div>
    </div> 
   <div className="grid grid-cols-7  outer-box "> {dayList.map((day, index) => (<div className="grid justify-center" key={index}>{day.medium} </div>))} </div>  
   <div className="grid grid-cols-7 w-[1214px] h-min-[923px]">{targetCalendarDates.map((date: Date, index) => {
              const isCurrentMonth =
                date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
              const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
              
              
              return (
                <div
                key={index}
                className={clsx('w-[173px] h-[184px] outer-box p-2.5', {
                  'bg-primary text-white': isToday,
                  'text-black': !isToday && isCurrentMonth,
                  'text-zinc-500 bg-zinc-100 opacity-30': !isToday && !isCurrentMonth,
                })}
                >
                  {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
                </div>
              );
            })}
       </div>   

</div>


  </div>;
}




export default App;
