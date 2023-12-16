import React, { useState } from "react";

import clsx from "clsx";
import "./App.css";
import { TodoItem, todoData as originTodoData } from "./consts/todoList";
import Todoheader from "./components/Todoheader";
import TodoList, { DoneIcon, TodoIcon } from "./components/components/TodoList";

function App() {
  const [todoData, setTodoData] = useState(originTodoData);

  const todoList = todoData.filter((item) => item.progress === "TODO");
  const doneList = todoData.filter((item) => item.progress === "DONE");

  const addTodo = (todo: TodoItem) => {
    setTodoData([...todoData, todo]);
  };
  const doneTodoList = (todo: TodoItem) => {
    todo.progress = "DONE";
    setTodoData([...todoData]);
  };

  // const add = () => {}
  return (
    <div className="w-screen h-screen items-center bg-blue-800">
      <div>
        <div className="felx flex-row ">
          <Todoheader onClickAdd={addTodo} />
          <div className="h-fit flex flex-row justify-center gap-10 py-20">
            <TodoList
              DoneTodoList={doneTodoList}
              list={todoList}
              title={"TodoList"}
              icon={<TodoIcon />}
            />

            <TodoList
              DoneTodoList={doneTodoList}
              list={doneList}
              title={"DoneList"}
              icon={<DoneIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
