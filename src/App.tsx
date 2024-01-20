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
import DayView from './components/DayView';
import YearView from './components/YearView';
import { Routes,Route,useNavigate } from 'react-router-dom';




function App() {
  const navigate =useNavigate( );
  
  const today = new Date();
  const [selectedDate, setDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedView, setSelectedView] = useState<string>('month');
  const [todoData, setTodoData] = useState<{ title: string; startedAt: Date; endedAt: Date;}[]>([]);
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


 // 팝업 상태 관리
  const [showPopup, setShowPopup] = useState(false);

  // 팝업 토글 함수
  const togglePopup = () => {
    setShowPopup(!showPopup)}

  

  const startOfWeek = new Date(today);
const dayOfWeek = today.getDay();
const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
startOfWeek.setDate(diff);

const hours = Array.from({ length: 24 }, (_, index) => index);
const weekDates = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(startOfWeek);
  date.setDate(startOfWeek.getDate() + index);
  return date;
});



  return (
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

  <div className="grow shrink basis-0 min-h-screen h-fit">
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
            id="viewSelect" onChange={(e) => navigate("/" + e.target.value)}>
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
        <button className="flex flex-row bg-lime-500 items-center text-white p-2 gap-2 rounded"
          onClick={togglePopup}>
         <div>Add event</div>
         <Plus />
        </button>
      </div>
      {showPopup && ( <ToDoAdd setTodoData={setTodoData} /> )}
      
    </div>

    <Routes>
    <Route path="/month" element={
        <div>
        <BigCalendar
          todos={todoData}         
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          today={today}
          selectedDate={selectedDate}
          dates={targetCalendarDates}
        />
        </div>
         }/> 
    <Route path="/test" element={<div> Test </div>} />

      <Route path="/year" element={
        <div className='grid w-full py-2'>
          <YearView
          selectedYear={selectedYear}
          targetCalendarDates={targetCalendarDates}
          />
       </div> 
         }/>
      <Route path="/day" element={
            <div className='flex flex-row outer-box '>
            <div>
              {hours.map((hour) => (
              <div key={hour} className="flex flex-col  h-[60px]">
            {hour > 9 ? hour : `0${hour}`}:00
            </div>
             ))}
           </div>
           <div className='w-[1640px] py-2 relative'>
          <DayView
            selectedDate={today}
          />
          <hr
        style={{
         border: 'none',
         borderTop: '2px solid red', 
        margin: 0,
        padding: 0, 
         width: '100%', 
        position: 'absolute', 
         top: `${(today.getHours() * 60) + today.getMinutes()}px`,
         }}
        />
       </div>
      </div>
        }/>
      <Route path="/week" element={
         <div className='flex flex-row w-full h-[calc(100vh)] '>
          
            <div className='py-2'>
              {hours.map((hour) => (
              <div key={hour} className="flex flex-col py-5 h-[60px] w-12 text-lime-500">
            {hour > 9 ? hour : `0${hour}`}:00
            </div>
             ))}
           </div>
         <div className='grid grid-cols-7 w-full'>
            
            {weekDates.map((day,index) => (
            <div>
              <div className='flex justify-center font-bold items-center h-10  border-white border-[1px] bg-lime-500 text-white'>
                {(day.getDate() > 9 ? day.getDate() : `0${day.getDate()}`)}</div>
              <div className=''>
          <DayView key={index} selectedDate={day}/>
          </div></div>))}
          </div>

          </div>
         }/>   
    

        


         </Routes>




    </div>
    
  
  </div>
  );
}

export default App;



