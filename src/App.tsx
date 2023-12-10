import React, { useState, useEffect } from "react";
import "./App.css";
import { Date, Level, todoData as originTodoData, Priority, TodoItem, TodoItemRequest } from "./consts/todoList";
import clsx from 'clsx';
import TodoHeader from "./components/TodoHeader";





function App() {
  

  const [todoData, setTodoData] = useState<TodoItem[]>(() => {
    // localStorage에서 데이터 불러오기
    const storedData = localStorage.getItem("todoData");
    return storedData ? JSON.parse(storedData) : [];
  });
  
  
  const todoList = todoData.filter((item) => item.progress === "TODO");
  const doneList = todoData.filter((item) => item.progress === "DONE");
  
  const handleDelete = (deleteId: number) => {
    // Todo 또는 Done 항목 삭제
    setTodoData((prev) => prev.filter((prevItem) => prevItem.id !== deleteId));
  };

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }, [todoData]);
  
  const handleAddTodo = (todo: TodoItemRequest) => { 
    setTodoData([...todoData, {...todo, id: todoData.length + 1}])}

  


  return <div className="bg-blue-900 w-full min-h-screen h-full flex flex-row justify-center items-center gap-5 ">
    <TodoHeader handleAddTodo={handleAddTodo}/>

<div className="flex flex-col gap-3">



<div className="flex flex-row gap-5">



<div className="bg-blue-100 w-[533px] h-fit p-[24px]  rounded-lg flex flex-col gap-5 items-start">
  <div className="flex flex-row gap-2">
    <div><TodoIcon/></div>
    <div className="text-2xl text-blue-800 font-bold">To-Do</div>
  </div>
  {todoList.map((item, index) => 
  <div key={index} className="bg-white w-[465px] p-[24px] grid gap-2 rounded-lg">
    <div className="font-bold text-lg"> {item.title}</div>
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-2">
        <div className={clsx('p-2 rounded-md', {
        'bg-priority-high': item.priority === 'high',
        'bg-priority-medium': item.priority === 'medium',
        'bg-priority-low': item.priority === 'low',
        })}>{item.dueDate}</div>
        <div className="flex flex-row gap-2" >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z" 
          className={clsx({
            'fill-priority-high': item.priority === 'high',
            'fill-priority-medium': item.priority === 'medium',
            'fill-priority-low': item.priority === 'low',                       
            })}/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z" 
          className={clsx({
            'fill-priority-high': item.priority === 'high',
            'fill-priority-medium': item.priority === 'medium',
            'fill-priority-low': item.priority === 'low',
            'fill-priority-inactive': item.level === 1          
            })}/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z" 
          className={clsx({
            'fill-priority-high': item.priority === 'high',
            'fill-priority-medium': item.priority === 'medium',
            'fill-priority-low': item.priority === 'low',
            '!fill-priority-inactive': item.level === 1 || item.level === 2,            
            })}/>
          </svg>
        </div>
      </div>  
      <div>{item.author}</div>
      
        <button
            className="text-white bg-blue-800 p-2"
            onClick={() => {
              setTodoData((prev) =>
                prev.map((prevItem, prevIndex) =>
                  prevItem.id === item.id
                    ? { ...prevItem, progress: "DONE" }
                    : prevItem
                )
              );
            }}
          >
            완료
          </button>
          <button
        className="text-white bg-red-500 p-2"
        onClick={() => handleDelete(item.id)}
      >
        삭제
      </button>
         
    </div>
  </div>
  )}
</div>

<div className="bg-blue-100 w-[533px] h-fit p-[24px]  rounded-lg flex flex-col gap-5 items-start">
  <div className="flex flex-row gap-2">
    <div><DoneIcon/></div>
    <div className="text-2xl text-blue-800 font-bold">Done</div>
  </div>
  {doneList.map((item, index) => 
  <div key={index} className="bg-white w-[465px] p-[24px] grid gap-2 rounded-lg">
    <div className="font-bold text-lg"> {item.title}</div>
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-2">
        <div className={clsx('p-2 rounded-md', {
        'bg-priority-high': item.priority === 'high',
        'bg-priority-medium': item.priority === 'medium',
        'bg-priority-low': item.priority === 'low',
        })}>{item.dueDate}</div>
        <div className="flex flex-row gap-2" >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z" 
          className={clsx({
            'fill-priority-high': item.priority === 'high',
            'fill-priority-medium': item.priority === 'medium',
            'fill-priority-low': item.priority === 'low',                       
            })}/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z" 
          className={clsx({
            'fill-priority-high': item.priority === 'high',
            'fill-priority-medium': item.priority === 'medium',
            'fill-priority-low': item.priority === 'low',
            'fill-priority-inactive': item.level === 1          
            })}/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z" 
          className={clsx({
            'fill-priority-high': item.priority === 'high',
            'fill-priority-medium': item.priority === 'medium',
            'fill-priority-low': item.priority === 'low',
            '!fill-priority-inactive': item.level === 1 || item.level === 2,            
            })}/>
          </svg>
        </div>
      </div>  
      <div>{item.author}</div>
      <button
            className="text-white bg-blue-800 p-2"
            onClick={() => {
              setTodoData((prev) =>
                prev.map((prevItem, prevIndex) =>
                  prevItem.id === item.id
                    ? { ...prevItem, progress: "TODO" }
                    : prevItem
                )
              );
            }}
          >
            복구
          </button>
          <button
        className="text-white bg-red-500 p-2"
        onClick={() => handleDelete(item.id)}
      >
        삭제
      </button>
    </div>
  </div>
  )}
</div>

</div>
</div>
  </div>;
}

export const TodoIcon = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.1096 6.47981C25.6652 4.90453 24.2174 3.75 22.5 3.75H17.5C15.7826 3.75 14.3348 4.90453 13.8904 6.47981M26.1096 6.47981C26.2011 6.80417 26.25 7.14637 26.25 7.5V7.5C26.25 8.19036 25.6904 8.75 25 8.75H15C14.3096 8.75 13.75 8.19036 13.75 7.5V7.5C13.75 7.14637 13.7989 6.80417 13.8904 6.47981M26.1096 6.47981C27.1865 6.56114 28.2576 6.66379 29.3222 6.78735C31.1565 7.00023 32.5 8.58167 32.5 10.4283V32.5C32.5 34.5711 30.8211 36.25 28.75 36.25H11.25C9.17893 36.25 7.5 34.5711 7.5 32.5V10.4283C7.5 8.58167 8.84347 7.00023 10.6778 6.78735C11.7424 6.66379 12.8135 6.56114 13.8904 6.47981"
        stroke="#2B1887"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DoneIcon = () => {
  return (
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.375 3.75H9.875C8.83947 3.75 8 4.58947 8 5.625V34.375C8 35.4105 8.83947 36.25 9.875 36.25H31.125C32.1605 36.25 33 35.4105 33 34.375V19.375M17.375 3.75H18C26.2843 3.75 33 10.4657 33 18.75V19.375M17.375 3.75C20.4816 3.75 23 6.2684 23 9.375V11.875C23 12.9105 23.8395 13.75 24.875 13.75H27.375C30.4816 13.75 33 16.2684 33 19.375M15.5 25L19.25 28.75L25.5 20"
        stroke="#2B1887"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default App;
