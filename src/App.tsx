import React, { useState } from 'react';
import './App.css';
import './consts/style.css';
import { getCalendarDates, getMonthString } from './libs/calendar';
import Arrow from './icons/Arrow';
import Hamburger from './icons/Hamburger';
import Search from './icons/Search';
import Plus from './icons/Plus';
import MonthHeader from './components/MonthHeader';
import DayHeader from './components/DayHeader';
import YearSelect from './components/YearSelect';
import MonthSelect from './components/MonthSelect';
import SmallCalendar from './components/SmallCalendar';
import BigCalendar from './components/BigCalendar';
import ToDoAdd from './components/ToDoAdd';
import DaySelector from './components/DaySelector';
import WeekView from './components/WeekView';
import DayView from './components/DayView';
import YearView from './components/YearView';



function App() {
  
  const today = new Date();
  const [selectedDate, setDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedView, setSelectedView] = useState<string>('month');
  const [todoData, setTodoData] = useState<{ title: string; startTime: string; endTime: string; date: Date }[]>([]);
  const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

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

  // 뷰 유형 변경 핸들러
  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedViewValue = e.target.value;
    setSelectedView(selectedViewValue);
  };

  const startOfWeek = new Date(today);
  const hours = Array.from({ length: 24 }, (_, index) => index);
  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return date;
  });

  return (
<div className="flex flex-row outer-box">
  <div className="w-[250px] h-min-[1024px] p-3">
   <div className="p-[10px] grid gap-2.5">
      <MonthHeader selectedMonth={selectedMonth}/>
      <DayHeader className='grid grid-cols-7 text-[10px]' form='short' />
      <SmallCalendar
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        today={new Date()}
      />
    </div>
    <div className='flex flex-col gap-3'>
    <ToDoAdd setTodoData={setTodoData} /> 
    <div className='bg-yellow-100 h-40'>
    <DaySelector title="TODAY" todoData={todoData} selectedDate={today} />
    </div>
    <div className='bg-green-100 h-40'>
    <DaySelector title="TOMORROW" todoData={todoData} selectedDate={tomorrow} />
    </div>
    </div>
  </div>
  <div className="w-[1214px] outer-box ">
   <div className="flex flex-row place-content-between items-center p-4">
     <div className="flex flex-row items-center gap-4 ">
       <Hamburger />
       <MonthHeader selectedMonth={selectedMonth} />
       <div className="text-[30px]"> {selectedYear}</div>
       <div className="flex flex-row">
       <YearSelect selectedYear={selectedYear} handleYearChange={handleYearChange}/>
       <MonthSelect selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
       <div>
            <label htmlFor="viewSelect"> </label>
            <select 
            className="text-primary border-primary border-solid border-[1px] p-2 gap-1 rounded"
            id="viewSelect" value={selectedView} onChange={handleViewChange}>
              <option value="year">Year</option>
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
              
            </select>
          </div>
          
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Search />
        <div className="flex flex-row bg-primary items-center text-white p-2 gap-2 rounded">
         <div>Add event</div>
         <Plus />
        </div>
      </div>
    </div>
    
{selectedView === 'month' && (
          <BigCalendar
            todoData={todoData}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            today={today}
            selectedDate={selectedDate}
            dates={targetCalendarDates}
          />
        )}

        {selectedView === 'week' && (
          <WeekView
            todoData={todoData}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            today={today}
            selectedDate={selectedDate}
            dates={targetCalendarDates}
          />
        )}
         <div className='grid grid-cols-7'>
         
    </div>

        {selectedView === 'day' && (
          <div className='flex flex-row'>
            
          <DayView
            todoData={todoData}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            today={today}
            selectedDate={selectedDate}
            dates={targetCalendarDates}
          />
          </div>
        )}

{selectedView === 'year' && (
        <YearView
        selectedYear={selectedYear}
        targetCalendarDates={targetCalendarDates}
        />
      )}




    </div>
    
  </div>
  );
}

export default App;

interface Todo {
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
}

