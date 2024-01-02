import React from "react";
import TimeSlotLabel from "../TimeSlotLabel";
import { getDayTodoList } from "../../consts/sampleData";
import { getConflictTodoList, getTodoHeight } from "../../libs/calendar";
import { isBrightness, reduceBrightness } from "../../libs/color";

type Props = { year: number; month: number; day: number };

export default function DayCalendar({ year, month, day }: Props) {
  const todoList = getConflictTodoList(getDayTodoList(year, month + 1, day));

  return (
    <div className="flex w-full">
      <TimeSlotLabel />

      <div className="relative w-full">
        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
          <div
            key={hour}
            className="h-[60px] border-l border-r border-b border-neutral-400 w-full"
          ></div>
        ))}
        {todoList.map((todo) => {
          return (
            <div
              className="absolute p-0.5"
              style={{
                top:
                  todo.startedAt.getHours() * 60 + todo.startedAt.getMinutes(),
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
                    ? reduceBrightness(
                        todo.category?.color ?? "#000000",
                        0.5
                      ) ?? "black"
                    : reduceBrightness(todo.category?.color ?? "#000000", 2) ??
                      "white",
                  color: isBrightness(todo.category?.color ?? "#000000")
                    ? reduceBrightness(
                        todo.category?.color ?? "#000000",
                        0.5
                      ) ?? "black"
                    : reduceBrightness(todo.category?.color ?? "#000000", 2) ??
                      "white",
                }}
              >
                {todo.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
