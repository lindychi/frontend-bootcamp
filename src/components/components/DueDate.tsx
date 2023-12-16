import React from "react";
import { Date, Priority } from "../../consts/todoList";

type Props = { priority: Priority; dueDate: Date };

export default function DueDate({ priority, dueDate }: Props) {
  return (
    <div
      className={`rounded-xl text-white ${
        priority === "high"
          ? "bg-priority-high"
          : priority === "medium"
          ? "bg-priority-medium"
          : priority === "low"
          ? "bg-priority-low"
          : ""
      } px-3 py-2`}
    >
      {dueDate}
    </div>
  );
}
