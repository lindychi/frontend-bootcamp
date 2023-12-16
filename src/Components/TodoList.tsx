import React, { ReactNode } from "react";
import { TodoIcon } from "../App";
import clsx from "clsx";
import { TodoItem, todoData } from "../consts/todoList";
import LevelUnit from "./LevelUnit";
import DueDateUnit from "./DueDateUnit";
import TodoListItem from "./TodoListItem";

type Props = {
  list: TodoItem[];
  title: string;
  finishTodo: (todo: TodoItem) => void;
  icon: ReactNode;
};
export default function TodoList({ list, finishTodo, title, icon }: Props) {
  const priorityMap: { [key: string]: string } = {
    high: "bg-priority-high",
    medium: "bg-priority-medium",
    low: "bg-priority-low",
  };

  return (
    <div className="flex flex-col bg-blue-100 p-5">
      <div className="To-Do flex justify-auto">
        <div className="pr-4">{icon}</div>
        <div className="styled-head">{title}</div>
      </div>
      {list.map((todo: TodoItem, index: any) => (
        <TodoListItem key={index} todo={todo} finishTodo={finishTodo} />
      ))}
    </div>
  );
}
