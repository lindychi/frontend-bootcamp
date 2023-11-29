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

  return <div>
<div className="w-[250px] h-max-[1024px]">  
  
  
   <div> {getMonthString(12)} </div> 
   <div className="grid grid-cols-7"> {dayList.map((day, index) => (<div key={index}>{day.short} </div>))} </div>  
   <div className="grid grid-cols-7"> {targetCalendarDates.map((date:Date,index) => (<div key={index} className="">{date.getDate()}</div>))} </div> 
  

</div>  



<div></div>


  </div>;
}




export default App;
