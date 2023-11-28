import React from "react";
import { TodoItem } from "../../consts/todoList";
import clsx from "clsx";

type Props = TodoItem & {};

export default function TodoListItem({
  title,
  author,
  dueDate,
  priority,
  level,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-xl flex flex-col gap-4 w-[512px]">
      <div className=" text-2xl font-bold">{title}</div>
      <div className="flex gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div
            className={clsx([
              "text-white",
              "rounded-lg",
              "p-2",
              "font-semibold",
              {
                "bg-priority-high": priority === "high",
                "bg-priority-medium": priority === "medium",
                "bg-priority-low": priority === "low",
              },
            ])}
          >
            {dueDate}
          </div>
          {[1, 2, 3].map((item) => (
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6.5H20C22.2091 6.5 24 8.29086 24 10.5V15.0714C24 16.965 22.465 18.5 20.5714 18.5H12C5.37258 18.5 0 13.1274 0 6.5Z"
                className={clsx([
                  {
                    "fill-priority-high": priority === "high",
                    "fill-priority-medium": priority === "medium",
                    "fill-priority-low": priority === "low",
                    "!fill-priority-inactive": item > level,
                  },
                ])}
              />
            </svg>
          ))}
        </div>
        <div className=" text-2xl text-blue-800">{author}</div>
      </div>
    </div>
  );
}
