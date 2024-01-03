import React, { useEffect, useState } from "react";
import {
  getConflictTodoList,
  getTodoHeight,
  getTodoTop,
} from "../../../libs/calendar";
import { isBrightness, reduceBrightness } from "../../../libs/color";
import { getDayTodoList } from "../../../consts/sampleData";
import clsx from "clsx";

type Props = { year: number; month: number; day: number; index?: number };

export default function DayColumn({ year, month, day, index = 0 }: Props) {
  const [today, setToday] = useState(new Date());
  const todoList = getConflictTodoList(getDayTodoList(year, month + 1, day));

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
        <div
          key={hour}
          className={clsx([
            "h-[60px] border-r border-neutral-400 w-full border-dashed",
            { "border-l": index === 0 },
            { "border-b": hour < 23 },
          ])}
        ></div>
      ))}
      {todoList.map((todo) => {
        return (
          <div
            key={todo.id}
            className="absolute p-0.5"
            style={{
              top: getTodoTop(todo, year, month, day),
              height: `${getTodoHeight(todo, year, month, day)}px`,
              left:
                todo.conflictLength === 0
                  ? 0
                  : `${
                      (todo.conflictIndex / (todo.conflictLength + 1)) * 100
                    }%`,
              width:
                todo.conflictLength === 0
                  ? "100%"
                  : `${(1 / (todo.conflictLength + 1)) * 100}%`,
            }}
          >
            <div
              key={todo.id}
              className="brightness-125 px-1 text-sm rounded border h-full flex items-start"
              style={{
                backgroundColor: todo.category?.color,
                borderColor: isBrightness(todo.category?.color ?? "#000000")
                  ? reduceBrightness(todo.category?.color ?? "#000000", 0.5) ??
                    "black"
                  : reduceBrightness(todo.category?.color ?? "#000000", 2) ??
                    "white",
                color: isBrightness(todo.category?.color ?? "#000000")
                  ? reduceBrightness(todo.category?.color ?? "#000000", 0.5) ??
                    "black"
                  : reduceBrightness(todo.category?.color ?? "#000000", 2) ??
                    "white",
              }}
            >
              <div className="truncate w-[calc(100%-15px)]">{todo.title}</div>
              <div>
                {todo.startedAt.getHours().toString().padStart(2, "0")}:
                {todo.startedAt.getMinutes().toString().padStart(2, "0")}
              </div>
            </div>
          </div>
        );
      })}
      {today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day && (
          <div
            className="absolute h-[2px] bg-red-600 w-full"
            style={{
              top: today.getHours() * 60 + today.getMinutes(),
            }}
          >
            <div className="absolute w-3 h-3 bg-red-600 rounded-full -left-1.5 -top-[5px]"></div>
          </div>
        )}
    </div>
  );
}
