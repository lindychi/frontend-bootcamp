import React, { useState } from 'react';

type ToDo = {
  title: string;
  time: string;
  date: Date;
};

type ToDoAddProps = {
  setTodoData: React.Dispatch<React.SetStateAction<ToDo[]>>;
};

const ToDoAdd: React.FC<ToDoAddProps> = ({ setTodoData }) => {
  const [title, setTitle] = useState('');
  const [selectedDate, setDate] = useState<Date | null>(null);

  const handleAddTodo = () => {
    if (title && selectedDate) {
      const newTodo = { title, time: '8:00', date: selectedDate as Date };

      // 이 부분에서 로컬 스토리지에 데이터 저장
      const existingTodos = JSON.parse(localStorage.getItem('todos') || '[]');
      const updatedTodos = [...existingTodos, newTodo];
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      // 상태 업데이트
      setTodoData(updatedTodos);

      setTitle('');
      setDate(null);
    }
  };

  return (
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
         setDate(new Date(selectedDateValue));
        }}
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
