import React from "react";
import TimeSlotLabel from "../TimeSlotLabel";
import { getDayTodoList } from "../../consts/sampleData";
import { getTodoHeight } from "../../libs/calendar";
import { reduceBrightness } from "../../libs/color";

type Props = { year: number; month: number; day: number };

export default function DayCalendar({ year, month, day }: Props) {
  const todoList = getDayTodoList(year, month + 1, day);

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
          console.log(reduceBrightness(todo.category?.color ?? "#FFFFFF", 0.5));
          return (
            <div
              className="absolute w-full p-0.5"
              style={{
                top:
                  todo.startedAt.getHours() * 60 + todo.startedAt.getMinutes(),
                height: `${getTodoHeight(todo)}px`,
              }}
            >
              <div
                key={todo.id}
                className="brightness-125 p-1 text-sm rounded border h-full"
                style={{
                  backgroundColor: todo.category?.color,
                  borderColor: todo.category?.color
                    ? reduceBrightness(todo.category?.color, 0.75) ?? "black"
                    : "black",
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
