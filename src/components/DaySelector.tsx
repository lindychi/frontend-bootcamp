import React from 'react';

type DayViewProps = {
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
};

type DayListViewProps = {
  todoData: DayViewProps[];
  selectedDate: Date;
};

const DayListView: React.FC<DayListViewProps> = ({ todoData, selectedDate }) => (
  <div >
    {todoData
      .filter((todo) => {
        const todoDate = new Date(todo.date);
        return (
          todoDate.getDate() === selectedDate.getDate() &&
          todoDate.getMonth() === selectedDate.getMonth() &&
          todoDate.getFullYear() === selectedDate.getFullYear()
        );
      })
      .map((todo, index) => (
        <div key={index} className='flex flex-row gap-5 px-3'>
          
          <div> {todo.startTime} </div>  
          <div> {todo.title} </div>
        </div>
      ))}
  </div>
);

type DaySelectorProps = {
  title: string;
  todoData: DayViewProps[];
  selectedDate: Date;
};

const DaySelector: React.FC<DaySelectorProps> = ({ title, todoData, selectedDate }) => (
  <div>
    <div className='font-bold flex items-center justify-center'>{title}</div>
    <DayListView todoData={todoData} selectedDate={selectedDate} />
  </div>
);

export default DaySelector;
