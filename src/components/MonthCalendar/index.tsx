import React from "react";
import clsx from "clsx";

import { getCalendarDates } from "../../libs/calendar";

import DayListHeader from "../DayListHeader";
import { getMonthTodoList } from "../../consts/sampleData";

type Props = { year: number; month: number };

export default function MonthCalendar({ year, month }: Props) {
  const targetCalendarDates = getCalendarDates(year, month);
  const todoList = getMonthTodoList(year, month);

  return (
    <>
      <DayListHeader />
      <div className="w-full h-[calc(100%-94px)] justify-center items-center">
        <div
          className="grow self-stretch justify-start items-start grid grid-cols-7 grid-rows-6 h-full"
          style={{
            gridTemplateRows: `repeat(${
              targetCalendarDates.length / 7
            }, minmax(0, 1fr)`,
          }}
        >
          {targetCalendarDates.map((date) => (
            <div
              key={date.getMonth() + "-" + date.getDate()}
              className={clsx([
                "self-stretch grow shrink basis-0 px-1 py-[3px] bg-white border border-gray-300 border-opacity-60 flex-col justify-start items-start gap-2.5 flex h-full relative",
                {
                  "bg-zinc-100 opacity-50": date.getMonth() !== month - 1,
                },
                {
                  "bg-white": date.getMonth() === month - 1,
                },
              ])}
            >
              <div className="p-1 justify-start items-start gap-2.5 inline-flex">
                <div className="h-[25px] p-[5px] justify-start items-start gap-2.5 flex">
                  <div className="justify-start items-start gap-2.5 flex">
                    <div className="text-zinc-800 text-[10px] font-medium">
                      {date.getDate() < 10
                        ? `0${date.getDate()}`
                        : date.getDate()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 text-xs w-[calc(100%-8px)] bg-inherit">
                {todoList
                  .filter(
                    (todo) =>
                      todo.startedAt.getMonth() === date.getMonth() &&
                      todo.startedAt.getDate() === date.getDate()
                  )
                  .sort((a, b) => a.startedAt.getTime() - b.startedAt.getTime())
                  .map((todo) => (
                    <div
                      key={todo.id}
                      className="w-full flex justify-between font-bold bg-inherit hover:brightness-75 rounded-md px-1 transition-all cursor-pointer"
                      style={{
                        color: todo.category?.color,
                      }}
                    >
                      <div className="flex items-center gap-1 w-[calc(100%-40px)]">
                        {todo.category?.color && (
                          <div
                            className="min-w-2 min-h-2 w-2 h-2 rounded-full brightness-125"
                            style={{ background: todo.category.color }}
                          ></div>
                        )}
                        <div className="truncate w-[calc(100%)]">
                          {todo.title}
                        </div>
                      </div>
                      <div className="font-normal text-black">{`${todo.startedAt
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${todo.startedAt
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}