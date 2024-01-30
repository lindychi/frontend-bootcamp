import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { supabase } from '../libs/supabase';

import { getCalendarDates, getMonthString } from '../libs/calendar';

import CalendarS from '../components/CalendarS';

import { dayList } from '../consts/calendar';
import Hamburger from '../icons/Hamburger';
import Search from '../icons/Search';
import Plus from '../icons/Plus';
import MonthCal from '../components/MonthCal';
import DayCal from '../components/DayCal';
import WeekCal from '../components/WeekCal';
import YearCal from '../components/YearCal';
import AddEvent from '../components/AddEvent';

type Props = {};

export default function Calendar({}: Props) {
  const navigate = useNavigate();

  const checkLogin = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data) {
      navigate('/login');
    }
  };

  const [selectedOption, setSelectedOption] = useState('month'); // Track selected option
  const [isAddEventOpen, setIsAddEventOpen] = useState(false); // Track AddEvent open state

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate('/' + e.target.value);
    setSelectedOption(e.target.value);
    console.log('/' + e.target.value);

    // 모달 열기 함수
    const handleAddEventClick = () => {
      setIsAddEventOpen(true);
    };

    // 모달 닫기 함수
    const handleCloseAddEvent = () => {
      setIsAddEventOpen(false);
    };

    useEffect(() => {
      checkLogin();
    }, []);

    const [selectedMonth, setSelectedMonth] = React.useState(1);
    const [selectedYear, setSelectedYear] = React.useState(2024);
    const targetCalendarDates: Date[] = getCalendarDates(
      selectedYear,
      selectedMonth
    );

    return (
      <div className="main">
        {/* 상단 헤더 */}
        <div className="header  flex w-100% h-[77px] py-[16px] px-[40px] justify-between bg-red border-b-#f0f0f0 ">
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
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
            </div>
          </div>

          {/* Add event */}
          <button className="right-contents flex justify-between gap-[16px] items-center">
            <div>
              <Search />
            </div>
            <div
              className="addEvent flex w-auto h-[35px] p-[8px] rounded bg-primary text-white text-sm gap-[4px] items-center"
              onClick={handleAddEventClick} // 클릭 이벤트를 통해 AddEvent 컴포넌트를 열도록 함
            >
              Add event <Plus />{' '}
            </div>
          </button>

          <Routes>
            <Route path="/" element={<MonthCal />} />
            <Route path="day" element={<DayCal />} />
            <Route path="week" element={<WeekCal />} />
            <Route path="year" element={<YearCal />} />
            <Route path="month" element={<MonthCal />} />
          </Routes>
        </div>

        {/* AddEvent Modal 렌더링 */}
        <div>
          {isAddEventOpen && <AddEvent onClose={handleCloseAddEvent} />}
        </div>
        <div className="flex flex-col items-center">
          Calnendar
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate('/login');
            }}
          >
            로그아웃
          </button>
        </div>
        {/* 헤더끝 */}

        {/* LNB 시작 */}
        <div className="lnb">
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

            <Outlet />
          </div>
        </div>
      </div>
    );
  };
}
