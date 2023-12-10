import React from "react";
import { TodoIcon } from "../App";
import clsx from "clsx";
import { TodoItem } from "../consts/todoList";

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
          <div className="frame2-1 flex w=[156px] space-x-3 items-center ">
            {/* 하단 이해못함 */}
            <div
              className={`${
                priorityMap[todo.priority] || "default"
              } styled-Date p-2 rounded-lg`}
            >
              {todo.dueDate}
            </div>

            <div className="frame2-2 flex gap-2">
              {[1, 2, 3].map((currentLevel) => (
                <div style={{ width: 24, height: 24 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 55 55"
                    fill="none"
                    width="100%"
                    height="100%"
                  >
                    <path
                      d="M0.737061 14.2498H45.856C50.8397 14.2498 54.8797 18.2898 54.8797 23.2735V33.5864C54.8797 37.8582 51.4168 41.3211 47.1451 41.3211H27.8084C12.8573 41.3211 0.737061 29.2008 0.737061 14.2498Z"
                      // fill="#D9D9D9"
                      className={clsx([
                        {
                          "!fill-[#D9D9D9]": todo.level < currentLevel,
                          "fill-[#2D41A7]": todo.priority === "low",
                          "fill-[#ECB800]": todo.priority === "medium",
                          "fill-[#E42C5F]": todo.priority === "high",
                        },
                      ])}
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <div className="frame2-3 styled-name w-[291.5px] ">
            <div className="text-right">{todo.author}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
