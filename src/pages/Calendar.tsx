import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../libs/supabase';
import SmallCalendar from '../components/SmallCalendar';
import DayHeader from '../components/DayHeader';
import MonthHeader from '../components/MonthHeader';
import Hamburger from '../icons/Hamburger';
import YearSelect from '../components/YearSelect';
import MonthSelect from '../components/MonthSelect';
import Search from '../icons/Search';
import Plus from '../icons/Plus';
import ToDoAdd from '../components/ToDoAdd';

type Props = {}

export default function Calendar({}: Props) {
    const Navigate = useNavigate()
    const checkLogin = async () => {
        const { data } = await supabase.auth.getUser();
        if (!data) {
            Navigate( "/login" )
        }
    }

    const today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedMonthValue = parseInt(e.target.value, 10);
        setSelectedMonth(selectedMonthValue);
      };
    
     // 년도 변경 이벤트 핸들러
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedYearValue = parseInt(e.target.value, 10);
        setSelectedYear(selectedYearValue);
      };
    const [todoData, setTodoData] = useState<{ title: string; startedAt: Date; endedAt: Date;}[]>([]);

    const [showPopup, setShowPopup] = useState(false);

    // 팝업 토글 함수
    const togglePopup = () => {
      setShowPopup(!showPopup)}

    useEffect(() =>{
    checkLogin();    
    },[])

  return (

 
       
        
<div className="flex flex-row min-w-screen min-h-screen h-fit">
    <div className="flex flex-row min-w-screen min-h-screen h-fit">
     <div className="w-[250px] self-stretch flex flex-col  ">
   <div className="p-[10px] grid gap-2">
      <MonthHeader selectedMonth={selectedMonth}/>
      <DayHeader className='grid grid-cols-7 text-[10px] ' form='short' />
      <SmallCalendar
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        today={new Date()}
      />
    </div>
    <div className='flex flex-col gap-3'>
    </div>
  </div>


    <main>
    <div className="flex flex-row outer-box place-content-between items-center p-4">
     <div className="flex flex-row items-center gap-4 ">
       <Hamburger />
       <MonthHeader selectedMonth={selectedMonth} />
       <div className="text-[30px]"> {selectedYear}</div>
       <div className="flex flex-row gap-2">
       <YearSelect selectedYear={selectedYear} handleYearChange={handleYearChange}/>
       <MonthSelect selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
       <div>
            <label htmlFor="viewSelect"> </label>
            <select 
            className="text-lime-500 border-lime-500  border-solid border-[1px] p-2 gap-1 rounded"
            id="viewSelect" onChange={(e) => Navigate("/" + e.target.value)}>
              <option value="year">Year</option>
              <option value="">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
              
            </select>
          </div>
          
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Search />
        <button className="flex flex-row bg-lime-500 items-center text-white p-2 gap-2 rounded"
          onClick={togglePopup}>
         <div>Add event</div>
         <Plus />
        </button>
        <button
        className='w-fit bg-yellow-500' 
        onClick={
        async() => {
            await supabase.auth.signOut();
            Navigate("/login")
        }
       }> 
    로그아웃 </button>
      </div>
      {showPopup && ( <ToDoAdd setTodoData={setTodoData} /> )}
      
    </div>
      <Outlet/>
    </main>
   </div>
   </div>
   
  )
}