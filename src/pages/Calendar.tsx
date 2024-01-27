import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../libs/supabase';

import { getCalendarDates, getMonthString } from "../libs/calendar";

import CalendarS from "../components/CalendarS";
import { DateName } from '../consts/calendar';
import { dayList } from "../consts/calendar";


type Props = {};

export default function Calendar({}: Props) {
  const navigate = useNavigate();

  const checkLogin = async () =>{
    const {data} = await supabase.auth.getUser();
    if (!data) {
      navigate("/login");
    }
  };



  useEffect(() => {
   checkLogin();

  }, [])

  const [selectedMonth, setSelectedMonth] = React.useState(1);
   const [selectedYear, setSelectedYear] = React.useState(2024);
   const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
     selectedMonth
   );


  return (
    
    <div className='flex flex-col items-center'>
      Calnendar
      <button
        onClick ={async() => {
          await supabase.auth.signOut();
          navigate("/login");
        }}
        >
        로그아웃
        </button>
        <div className='lnb'>
          <div className="calendar flex justify-start w-100vw h-100vh   border solid-f0f0f0">
         <div className="sidebar flex-col w-[250px] bg-gray-100 border-1px-solid-f0f0f0">
          {/* 미니캘린더 */}
          <div>
            <CalendarS
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              dayList={dayList}
            />
          </div>

        {/* 할일flex */}
          <div className="todoList w-[250px] min-h-[100px] py-[10px] px-[16px] gap-[10px]  bg-green-400">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
                <div className="text-sm pl-2 pt-0.5">일상</div>
              </div>
              <button className=" font-medium">+</button>
            </div>
          </div>
        </div>
          


          

          
        




          
          <main>
            <header></header>
            <Outlet />
          </main>
          </div>
    </div>    
    </div>
  );
}