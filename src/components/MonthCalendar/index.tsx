import React from "react";
import clsx from "clsx";

import { getCalendarDates } from "../../libs/calendar";

import DayListHeader from "../DayListHeader";
import { getMonthTodoList } from "../../consts/sampleData";

type Props = {};

export default function MonthCalendar({}: Props) {
  const [selectedMonth, setSelectedMonth] = React.useState(12);
  const [selectedYear, setSelectedYear] = React.useState(2023);
  const targetCalendarDates = getCalendarDates(selectedYear, selectedMonth);
  const todoList = getMonthTodoList(selectedYear, selectedMonth);

  return (
    <>
      <DayListHeader />
      <div className="w-full h-[calc(100%-94px)] justify-center items-center">
        <div className="grow self-stretch justify-start items-start grid grid-cols-7 grid-rows-6 h-full">
          {targetCalendarDates.map((date) => (
            <div
              key={date.getMonth() + "-" + date.getDate()}
              className={clsx([
                "self-stretch grow shrink basis-0 px-1 py-[3px] bg-white border border-gray-300 border-opacity-60 flex-col justify-start items-start gap-2.5 flex h-full relative",
                {
                  "bg-zinc-100 opacity-50":
                    date.getMonth() !== selectedMonth - 1,
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
              <div className="absolute left-2 bottom-2 text-xs w-[calc(100%-16px)]">
                {todoList
                  .filter((todo) => todo.startedAt.getDate() === date.getDate())
                  .map((todo) => (
                    <div className="w-full flex justify-between">
                      <div>{todo.title}</div>
                      <div>{`${todo.startedAt
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
