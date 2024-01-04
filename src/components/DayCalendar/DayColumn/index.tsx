import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { HttpStatusCode } from "axios";

import { getDayTodoList } from "../../../consts/sampleData";

import { getConflictTodoList } from "../../../libs/calendar";

import { ConflictEventItem } from "../../../types/common";

import { getDayEvents } from "../../../services/eventService";

import EventColumn from "../EventColumn";

type Props = { year: number; month: number; day: number; index?: number };

export default function DayColumn({ year, month, day, index = 0 }: Props) {
  const [today, setToday] = useState(new Date());
  const todoList = getConflictTodoList(getDayTodoList(year, month + 1, day));
  const [dbTodoList, setDbTodoList] = useState<ConflictEventItem[]>(
    [] as any[]
  );

  const loadTodayEvents = async () => {
    const result = await getDayEvents({ year, month: month + 1, day });
    if (result.status === HttpStatusCode.Ok) {
      setDbTodoList(
        getConflictTodoList([
          ...result.data.map((todo) => ({
            ...todo,
            startedAt: new Date(todo.startedAt),
            endedAt: todo.endedAt ? new Date(todo.endedAt) : undefined,
          })),
          ...todoList,
        ])
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadTodayEvents();
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
      {dbTodoList.map((todo) => {
        return (
          <EventColumn
            key={todo.id}
            event={todo}
            year={year}
            month={month}
            day={day}
          />
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
