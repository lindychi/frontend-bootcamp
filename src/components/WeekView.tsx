// WeekView.tsx

import React from 'react';
import clsx from 'clsx';
import { dayList } from '../consts/calendar';

type Todo = {
  title: string;
  time: string;
  date: Date;
};

type Props = {
  todoData: Todo[];
  selectedMonth: number;
  selectedYear: number;
  today: Date;
  selectedDate: Date | null;
  dates: Date[];
};

const WeekView: React.FC<Props> = ({
  todoData,
  selectedMonth,
  selectedYear,
  today,
  selectedDate,
  dates,
}) => {
  // 이번 주를 표시하는 코드
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // 일요일로 이동
  
  const hours = Array.from({ length: 24 }, (_, index) => index);
  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return date;
  });

  return (
    <div className='flex flex-row'>
      <div className='flex flex-col'>
      {hours.map((hour) => (
        <div key={hour} className="flex flex-col h-[80px]">
          {hour > 9 ? hour : `0${hour}`}:00
          
        </div>
            ))}
         
      </div>
    <div className="grid grid-cols-7 w-[1214px] h-min-[923px]">
    
      {weekDates.map((date: Date, index) => {
        const isCurrentMonth =
          date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
        const isToday =
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear();

        const isSelectedDate =
          selectedDate &&
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear();
        
          const filterDate = (todos: Todo[], selectedDate: Date | null, selectedHour: number): Todo[] => {
            if (!selectedDate) {
            return [];
          }
        
          return todos.filter((todo) => {
            const todoDate = new Date(todo.date);
        
            return (
              todoDate.getDate() === selectedDate.getDate() &&
              todoDate.getMonth() === selectedDate.getMonth() &&
              todoDate.getFullYear() === selectedDate.getFullYear() &&
              Number(todo.time.split(":")[0])=== selectedHour      
            );
          });
        };

        return (
          <div>
            <div>
            <div key={index}>
              <div className='flex flex-row justify-center'>
                <div className='flex justify-center'>
                {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}
                </div>
                <div>
                {dayList[date.getDay()].medium}
                </div>
                <div>
                
                </div>
             </div>
             </div>
             <div>
   

      
      </div>

           </div>

            
            <div className="flex flex-col relative">
          {hours.map((hour) => (
            <div key={hour} className="flex flex-row gap-4  ">
              {/* Display your time slots here */}
              
              
              
              <div className="outer-box w-[1024px] h-[80px]">
                {/* You can add content for each time slot here */}
                {todoData
                  .filter((item) => {
                    const todoDate = new Date(item.date);
                    return (
                      todoDate >= date &&
                      todoDate < new Date(date.getTime() + 24 * 60 * 60 * 1000) &&
                      todoDate.getHours() === hour
                    );
                  })
                  .map((item, index) => (
                    <div key={index} className="flex flex-row gap-4">
                      <div>{item.title}</div>
                      <div>{item.time}</div>
                    </div>
                  ))}
              </div>
              
            </div>
          ))}
        </div>
      </div>
    );
  })}
</div>
   
              
    </div>
  );
};

export default WeekView;
