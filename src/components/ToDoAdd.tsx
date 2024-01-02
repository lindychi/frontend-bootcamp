import React, { useState } from 'react';

type Todo = {
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
};

type ToDoAddProps = {
  setTodoData: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const ToDoAdd: React.FC<ToDoAddProps> = ({ setTodoData }) => {
  const [title, setTitle] = useState('');
  const [selectedDate, setDate] = useState<Date | null>(null);
  const [selectedStartTime, setStartTime] = useState<string>('08:00');
   const [selectedEndTime, setEndTime] = useState<string>('08:30');

  const handleAddTodo = () => {
    if (title && selectedDate && selectedStartTime && selectedEndTime) {
      const newTodo = {
        title,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
        date: selectedDate as Date,
      };

      // 이 부분에서 로컬 스토리지에 데이터 저장
      const existingTodos = JSON.parse(localStorage.getItem('todos') || '[]');
      const updatedTodos = [...existingTodos, newTodo];
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      // 상태 업데이트
      setTodoData(updatedTodos);

      setTitle('');
      setDate(null);
      setStartTime('08:00');
      setEndTime('08:30');
    }
  };

  return (
    <div className='flex flex-col'>
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
         setDate(new Date(selectedDateValue));
        }}
      />
       Start Time{' '}
      <input
        type="time"
        value={selectedStartTime}
        onChange={(event) => setStartTime(event.target.value)}
      />
      End Time{' '}
      <input
        type="time"
        value={selectedEndTime}
        onChange={(event) => setEndTime(event.target.value)}
      />
      <button
        className="bg-primary text-white"
        onClick={handleAddTodo}
      >
        추가
      </button>
      {JSON.stringify(ToDoAdd)}
      
    </div>
  );
};

export default ToDoAdd;
