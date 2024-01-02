import React from "react";
import { getConflictTodoList, getTodoHeight } from "../../../libs/calendar";
import { isBrightness, reduceBrightness } from "../../../libs/color";
import { getDayTodoList } from "../../../consts/sampleData";
import clsx from "clsx";

type Props = { year: number; month: number; day: number; index?: number };

export default function DayColumn({ year, month, day, index = 0 }: Props) {
  const todoList = getConflictTodoList(getDayTodoList(year, month + 1, day));

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
            className="absolute p-0.5"
            style={{
              top: todo.startedAt.getHours() * 60 + todo.startedAt.getMinutes(),
              height: `${getTodoHeight(todo)}px`,
              left:
                todo.conflictLength === 0
                  ? 0
                  : `${(todo.conflictIndex / todo.conflictLength) * 100}%`,
              width:
                todo.conflictLength === 0
                  ? "100%"
                  : `${(1 / todo.conflictLength) * 100}%`,
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
              <div className="truncate w-[calc(100%-10px)]">{todo.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
