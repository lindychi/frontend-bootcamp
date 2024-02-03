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

export default function Calendar({}: Props): JSX.Element {
  const navigate = useNavigate();

  const checkLogin = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data) {
      navigate('/login');
    }
  };

  const [selectedOption, setSelectedOption] = useState('month'); // Track selected option
  const [isAddEventOpen, setIsAddEventOpen] = useState(false); // Track AddEvent open state
  const [selectedMonth, setSelectedMonth] = React.useState(2);
  const [selectedYear, setSelectedYear] = React.useState(2024);

  // useEffect를 이용하여 로그인 확인 처리
  useEffect(() => {
    checkLogin();
  }, []);

  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate('/' + e.target.value);
    setSelectedOption(e.target.value);
    console.log('/' + e.target.value);
  };

  // 모달 열기 함수
  const handleAddEventClick = () => {
    setIsAddEventOpen(true);
  };

  // 모달 닫기 함수
  const handleCloseAddEvent = () => {
    setIsAddEventOpen(false);
  };

  return (
    <div className="main flex">
      {/* LNB 시작 */}
      <div className="calendar flex flex-col justify-start w-100vw h-100vh   border solid-f0f0f0">
        <div className="sidebar flex-col w-[250px] bg-gray-100 border-1px-solid-f0f0f0">
          {/* 미니캘린더 */}
          <div>
            <CalendarS
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              dayList={dayList}
            />
          </div>
        </div>
        {/* 할일 */}
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
      {/* LNB 끝 */}

      <div className="main w-full flex flex-col ">
        {/* 헤더 시작*/}
        <div className="header flex w-full justify-between bg-red-200  h-[77px] py-[16px] bg-red  border-b-#f0f0f0 items-center">
          <div className="headerLeft flex  gap-5 px-5">
            <div>
              <Hamburger />
            </div>
            <div className="Month-title flex gap-[4px] items-center">
              {/* 월 */}
              <div className="text-3xl text-center font-semibold">
                {getMonthString(2)}
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
          <div className="headerRight flex flex-grow justify-end px-5">
            <div>
              <Search />
            </div>
            <button className="px-4">
              <div
                className="addEvent flex w-auto h-[35px] p-[8px] rounded bg-primary text-white text-sm gap-[4px] items-center"
                onClick={handleAddEventClick} // 클릭 이벤트를 통해 AddEvent 컴포넌트를 열도록 함
              >
                Add event <Plus />{' '}
              </div>
            </button>

            <div className="flex w-auto text-sm h-[35px] p-[8px]   bg-gray-200 rounded">
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate('/login');
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
          <Routes>
            <Route path="/" />
            <Route path="day" />
            <Route path="week" />
            <Route path="year" />
            <Route path="month" />
          </Routes>

          {/* AddEvent Modal 렌더링 */}
          <div>
            {isAddEventOpen && <AddEvent onClose={handleCloseAddEvent} />}
          </div>
        </div>
        {/* 헤더끝 */}

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
