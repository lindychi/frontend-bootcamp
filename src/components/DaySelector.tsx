import React from 'react';

type DayViewProps = {
  title: string;
  time: string;
  date: Date;
};

type DayListViewProps = {
  todoData: DayViewProps[];
  selectedDate: Date;
};

const DayListView: React.FC<DayListViewProps> = ({ todoData, selectedDate }) => (
  <div>
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
        <div key={index}>
          {/* 여기에 할 일 정보를 표시합니다. */}
          {todo.title} - {todo.time}
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
    <div>{title}</div>
    <DayListView todoData={todoData} selectedDate={selectedDate} />
  </div>
);

export default DaySelector;
