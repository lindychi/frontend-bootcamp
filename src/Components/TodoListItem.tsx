import React from "react";
import { TodoItem } from "../consts/todoList";
import DueDateUnit from "./DueDateUnit";
import LevelUnit from "./LevelUnit";

type Props = { todo: TodoItem; finishTodo: (todo: TodoItem) => void };

export default function TodoListItem({ todo, finishTodo }: Props) {
  return (
    <div className=" Task p-6 bg-white rounded-lg mt-6 mb-6">
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
        <DueDateUnit todo={todo} />

        <div className="frame2-2 flex gap-2 ">
          {[1, 2, 3].map((currentLevel) => (
            <LevelUnit
              level={todo.level}
              priority={todo.priority}
              currentLevel={currentLevel}
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
  );
}
