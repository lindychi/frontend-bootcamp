import React, { useState } from "react";

import clsx from "clsx";
import "./App.css";
import { TodoItem, todoData as originTodoData } from "./consts/todoList";
import Todoheader from "./components/Todoheader";
import TodoList from "./components/components/TodoList";
import DoneList from "./components/components/DoneList";

function App() {
  const [todoData, setTodoData] = useState(originTodoData);
  // 레벨이 "level"으로 설정되어 있어서 string타입으로 되어 있어서 error가나왔음 1 | 2 | 3; 숫자로 바꿨음 , 대표값 하나만 넣으면 된다.

  const todoList = todoData.filter((item) => item.progress === "TODO");
  const doneList = todoData.filter((item) => item.progress === "DONE");

  const addTodo = (todo: TodoItem) => {
    setTodoData([...todoData, todo]);
  };
  const doneTodoList = (todo: TodoItem) => {
    todo.progress = "DONE";
    setTodoData([...todoData]);
  };

  const TodoTodoList = () => {
    setTodoData([...todoData]);
  };
  // const add = () => {}
  return (
    <div className="w-screen h-screen items-center bg-blue-800">
      <div>
        <div className="felx flex-row ">
          <Todoheader onClickAdd={addTodo} />
          <div className="h-fit flex flex-row justify-center gap-10 py-20">
            <TodoList DoneTodoList={doneTodoList} list={todoList} />
            <TodoTodoList />
            <DoneList list={doneList} />
          </div>
        </div>
      </div>
    </div>
  );
}

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

export const SVGIcon = ({ item }: { item: TodoItem }) => {
  const icons = [];
  for (let i = 0; i < item.level; i++) {
    icons.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z"
          className={clsx({
            "fill-priority-high": item.priority === "high",
            "fill-priority-medium": item.priority === "medium",
            "fill-priority-low": item.priority === "low",
          })}
        />
      </svg>
    );
  }
  for (let i = 3; i > item.level; i--) {
    icons.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z"
          className="fill-priority-inactive"
        />
      </svg>
    );
  }

  return <>{icons}</>;
};
export default App;
