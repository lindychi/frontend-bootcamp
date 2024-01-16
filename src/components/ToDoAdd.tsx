import React, { useState } from 'react';

type Todo = {
  title: string;
  startedAt: string;
  endedAt: string;
};

type ToDoAddProps = {
  setTodoData: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const ToDoAdd: React.FC<ToDoAddProps> = ({ setTodoData }) => {
  const [title, setTitle] = useState('');
  const [selectedStartedAt, setStartedAt] = useState('');
  const [selectEndedAt, setEndedAt] = useState('');
  

  const handleAddTodo = () => {
    if (title && selectedStartedAt && selectEndedAt) {
      const newTodo = {
        title,
        setStartedAt: selectedStartedAt,
        setEndedAt: selectEndedAt,
      };

      // 이 부분에서 로컬 스토리지에 데이터 저장
      const existingTodos = JSON.parse(localStorage.getItem('todos') || '[]');
      const updatedTodos = [...existingTodos, newTodo];
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      // 상태 업데이트
      setTodoData(updatedTodos);
      setTitle('');
      setStartedAt('');
      setEndedAt('');
    }
  };

  return (
    <div className='flex flex-col'>
      제목{''}
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      
      일정 시작{' '}
      <input
        type="datetime-local"
        value={selectedStartedAt}
        onChange={(event) => setStartedAt(event.target.value)}
      />
      일정 끝{' '}
      <input
        type="datetime-local"
        value={selectEndedAt}
        onChange={(event) => setEndedAt(event.target.value)}
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
