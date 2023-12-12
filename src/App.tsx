import React, { useState } from 'react';
import clsx from 'clsx';
import './App.css';
import './consts/style.css';
import { dayList } from './consts/calendar';
import { getCalendarDates, getMonthString } from './libs/calendar';
import Arrow from './icons/Arrow';
import Hamburger from './icons/Hamburger';
import Search from './icons/Search';
import Plus from './icons/Plus';
import { title } from 'process';
import MonthHeader from './components/MonthHeader';
import DayHeader from './components/DayHeader';
import YearSelect from './components/YearSelect';
import MonthSelect from './components/MonthSelect';
import SmallCalendar from './components/SmallCalendar';

function App() {
  // 현재 날짜 설정
  const today = new Date();
  // 입력값과 선택된 날짜 상태 변수 설정
  const [title, setTitle] = useState('');
  const [selectedDate, setDate] = useState<Date | null>(null);
  // 할 일 데이터와 선택된 월, 년도 설정
  const [todoData, setTodoData] = useState<{ title: string; time: string; date: Date }[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  

  // 선택된 월, 년도에 따른 달력 날짜 계산
  const targetCalendarDates: Date[] = getCalendarDates(selectedYear, selectedMonth);

  // 월 변경 이벤트 핸들러
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonthValue = parseInt(e.target.value, 10);
    setSelectedMonth(selectedMonthValue);
  };

  // 년도 변경 이벤트 핸들러
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYearValue = parseInt(e.target.value, 10);
    setSelectedYear(selectedYearValue);
  };

  // 할 일 필터링 함수
  const filterDate = (todos: Todo[], selectedDate: Date | null): Todo[] => {
    if (!selectedDate) {
      return [];
    }
  
    return todos.filter((todo) => {
      const todoDate = new Date(todo.date);
      return (
        todoDate.getDate() === selectedDate.getDate() &&
        todoDate.getMonth() === selectedDate.getMonth() &&
        todoDate.getFullYear() === selectedDate.getFullYear()
      );
    });
    
  
  };

  return (
    <div className="flex flex-row outer-box">
      <div className="w-[250px] h-min-[1024px] p-3">
        <div className="p-[10px] grid gap-2.5">
          {/* 월과 요일 헤더 */}
          <MonthHeader selectedMonth={selectedMonth}/>
          <DayHeader className='grid grid-cols-7 text-[10px]' />
          {/* 달력 날짜 표시 */}
          <SmallCalendar
          dates={targetCalendarDates}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          today={new Date()}
          />
        </div>
        {/* 할 일 추가 섹션 */}
        <div>
          <div>
            Title{''}
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            Date{}
            <input
              type="date"
              value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
              onChange={(event) => {
                const selectedDateValue = event.target.value;
                setDate((prevState) => new Date(selectedDateValue));
              }}
            />
            <button
  className="bg-primary text-white"
  onClick={() => {
    
      setTodoData([...todoData,
        { title ,
          time : "8:00" ,
          date: selectedDate as Date ,
        }])
      
          setTitle("")
          setDate(null)
         
  }}
>
  추가
</button>
{JSON.stringify(todoData)}
          </div>
        </div>
      </div>

  <div className="w-[1214px] outer-box ">
      {/* 헤더 */}
      <div className="flex flex-row place-content-between items-center p-4">
        <div className="flex flex-row items-center gap-4 ">
            <div>
              <Hamburger />
            </div>
           <MonthHeader selectedMonth={selectedMonth} />
            <div className="text-[30px]"> {selectedYear}</div>
            <div className="flex flex-row">
              <YearSelect selectedYear={selectedYear} handleYearChange={handleYearChange}/>
              <MonthSelect selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
            </div>
          </div>

          {/* 검색 및 이벤트 추가 섹션 */}
          <div className="flex flex-row items-center gap-4">
            <Search />
            <div className="flex flex-row bg-primary items-center text-white p-2 gap-2 rounded">
              <div>Add event</div>
              <Plus />
            </div>
          </div>
      </div>

        {/* 요일 헤더 */}
       <DayHeader className="grid grid-cols-7 outer-box" />

        {/* 달력 날짜 표시 */}
        <div className="grid grid-cols-7 w-[1214px] h-min-[923px]">
        {targetCalendarDates.map((date: Date, index) => {
  const isCurrentMonth =
    date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  // 선택된 날짜와 달력에 표시된 날짜가 같을 때만 할 일 표시
  const isSelectedDate =
    selectedDate &&
    date.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear();

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

      {/* 선택된 날짜와 달력에 표시된 날짜가 같을 때만 할 일 표시 */}
      { filterDate(todoData, date).map((item, index) => (
          <div key={index} className="flex flex-row gap-4">
            <div>{item.title}</div>
            <div>{item.time}</div>
          </div>
              ))}
            </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}

export default App;

interface Todo {
  title: string;
  time: string;
  date: Date;
}

