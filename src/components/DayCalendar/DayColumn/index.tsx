import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { HttpStatusCode } from "axios";
import { useQuery } from "react-query";

import { getConflictTodoList } from "../../../libs/calendar";

import { getDayEvents } from "../../../services/eventService";

import EventColumn from "../EventColumn";
import { ConflictEventItem } from "../../../types/common";

type Props = {
  year: number;
  month: number;
  day: number;
  index?: number;
  onClickEvent?: (
    e: React.MouseEvent<HTMLDivElement>,
    data: ConflictEventItem
  ) => void;
};

export default function DayColumn({
  year,
  month,
  day,
  onClickEvent,
  index = 0,
}: Props) {
  const [today, setToday] = useState(new Date());

  const loadTodayEvents = async () => {
    const result = await getDayEvents({ year, month: month + 1, day });
    if (result.status === HttpStatusCode.Ok) {
      return getConflictTodoList([
        ...result.data.map((todo) => ({
          ...todo,
          startedAt: new Date(todo.startedAt),
          endedAt: todo.endedAt ? new Date(todo.endedAt) : undefined,
        })),
      ]);
    }
  };

  const {
    data: eventDataList,
    error,
    isLoading,
  } = useQuery(["events", year, month, day], loadTodayEvents);

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
      {eventDataList?.map((todo) => {
        return (
          <EventColumn
            key={todo.id}
            event={todo}
            year={year}
            month={month}
            day={day}
            onClick={onClickEvent}
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
