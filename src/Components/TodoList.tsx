import React from "react";
import { TodoIcon } from "../App";
import clsx from "clsx";
import { TodoItem } from "../consts/todoList";
import LevelUnit from "./LevelUnit";

type Props = {
  list: TodoItem[];
  finishTodo: (todo: TodoItem) => void;
};
export default function TodoList({ list, finishTodo }: Props) {
  const priorityMap: { [key: string]: string } = {
    high: "bg-priority-high",
    medium: "bg-priority-medium",
    low: "bg-priority-low",
  };

  return (
    <div className="flex flex-col bg-blue-100 p-5">
      <div className="To-Do flex justify-auto">
        <div className="pr-4">
          <TodoIcon />
        </div>
        <div className="styled-head">to-do</div>
      </div>
      {list.map((todo: TodoItem, index: any) => (
        <div key={index} className=" Task p-6 bg-white rounded-lg mt-6 mb-6">
          <div className="flex justify-between">
            <div className="frame1 styled-title pb-8">{todo.title}</div>
            <button
              onClick={() => {
                finishTodo(todo);
              }}
              className="bt-finish bg-blue-800 text-white p-3 rounded-lg"
            >
              완료
            </button>
          </div>
          <div className="frame2-1 flex w-[156px] space-x-3 items-center ">
            {/* 하단 이해못함 */}
            <div
              className={`${
                priorityMap[todo.priority] || "default"
              } styled-Date p-2 rounded-lg`}
            >
              {todo.dueDate}
            </div>

            <div className="frame2-2 flex gap-2 ">
              {[1, 2, 3].map((currentLevel) => (
                <LevelUnit
                  level={todo.level}
                  priority={todo.priority}
                  currentLevel={todo.level}
                />
              ))}
              <div className="frame2-3 styled-name w-[291.5px] p-5 ">
                <div className="text-right">{todo.author}</div>
              </div>
            </div>
          </div>
          {/* <div className="frame2-3 styled-name w-[291.5px] ">
            <div className="text-right">{todo.author}</div>
          </div> */}
        </div>
      ))}
    </div>
  );
}
