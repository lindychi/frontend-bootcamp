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
  const [selectedMonth, setSelectedMonth] = React.useState(12);
  const [selectedYear, setSelectedYear] = React.useState(2023);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );
 

  return <div className="flex flex-row w-full h-full outer-box">
<div className="w-[250px] h-max-[1024px] p-3">  
  
 <div className=" p-[10px] grid gap-2.5">
   <div className="items-center  px-[6px] text-xl grid justify-start"> {getMonthString(12)} </div> 
   <div className="grid grid-cols-7 text-sm "> {dayList.map((day, index) => (<div className="w-[26px] h-[25px]" key={index}>{day.short}  </div>))} </div>  
   <div className="grid grid-cols-7 text-sm "> {targetCalendarDates.map((date:Date,index) => (<div className="w-[30px] h-[33px] items-start" key={index}>{date.getDate()}</div>))} </div> 
  </div> 


</div>  
   


<div className="w-[1214px] outer-box py-3">
   <div className="flex flex-row place-content-between items-center"> 
     <div className="flex flex-row items-center ">
      <div>< Hamburger /></div>
      <div className="text-2xl font-bold">{getMonthString(12)} </div>
      <div className="text-2xl"> {selectedYear}</div>
      <select></select>
     </div>
     <div className="flex flex-row items-center"> 
      <div><Search /></div>
      <div className="flex flex-row bg-primary items-center text-white p-2">
        <div>Add event</div>
        <div> <Plus/></div>
        </div>

     </div>
    </div> 
   <div className="grid grid-cols-7 outer-box"> {dayList.map((day, index) => (<div key={index}>{day.medium} </div>))} </div>  
   <div className="grid grid-cols-7 w-[1214px] h-[923px]"> {targetCalendarDates.map((date:Date,index) => (<div key={index} className="outer-box">{date.getDate()}</div>))} </div>   


</div>


  </div>;
}




export default App;
