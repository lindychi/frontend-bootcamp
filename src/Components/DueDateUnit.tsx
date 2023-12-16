import React from "react";
import { Priority, TodoItem } from "../consts/todoList";

type Props = { todo: TodoItem };

export default function DueDateUnit({ todo }: Props) {
  const priorityMap: { [key: string]: string } = {
    high: "bg-priority-high",
    medium: "bg-priority-medium",
    low: "bg-priority-low",
  };

  return (
    <div
      className={`${
        priorityMap[todo.priority] || "default"
      } styled-Date p-2 rounded-lg`}
    >
      {todo.dueDate}
    </div>
  );
}
