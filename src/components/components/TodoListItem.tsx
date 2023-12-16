import React from "react";
import DueDate from "./DueDate";
import { SVGIcon } from "./TodoList";
import { TodoItem } from "../../consts/todoList";

type Props = { item: TodoItem };

export default function TodoListItem({ item }: Props) {
  return (
    <div className=" h-[130px] flex flex-col gap-6 p-6 bg-white rounded-xl">
      <div className="flex justify-between">
        <div className="text-2xl">{item.title}</div>
        <button onClick={() => {}}>완료</button>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-row gap-4">
          <DueDate priority={item.priority} dueDate={item.dueDate} />
          <SVGIcon item={item} />
        </div>
        <div
          className="text-blue-800
            text-xl"
        >
          {item.author}
        </div>
      </div>
      <div className="hidden">
        {item.priority}
        {item.level}
      </div>
    </div>
  );
}
