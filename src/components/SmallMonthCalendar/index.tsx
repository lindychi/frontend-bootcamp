import React from "react";
import { dayList } from "../../consts/calendar";
import { getCalendarDates } from "../../libs/calendar";
import clsx from "clsx";

type Props = { year: number; month: number };

export default function SmallMonthCalendar({ year, month }: Props) {
  const targetCalendarDates = getCalendarDates(year, month);

  return (
    <div className="self-stretch p-2.5 flex-col justify-start items-start gap-2.5 flex">
      <div className="self-stretch flex-col justify-start items-start flex">
        <div className="self-stretch opacity-70 justify-around items-start inline-flex">
          {dayList.map((dayName) => (
            <div className="p-1 justify-start items-start gap-2.5 flex">
              <div className="h-[25px] p-[5px] justify-center items-center gap-2.5 flex">
                <div className="justify-start items-start gap-2.5 flex">
                  <div className="text-zinc-800 text-[10px] font-medium">
                    {dayName.short}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="self-stretch justify-between items-start grid grid-cols-7">
          {targetCalendarDates.map((date: Date) => (
            <div className="w-full h-full p-1 justify-center items-start gap-2.5 inline-flex">
              <div
                className={clsx("h-[25px] p-[5px]", {
                  "bg-primary rounded-[99px] justify-center items-center gap-2.5 flex":
                    date.getFullYear() === new Date().getFullYear() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getDate() === new Date().getDate(),
                  "justify-start items-start gap-2.5 flex":
                    date.getMonth() !== month - 1,
                })}
              >
                <div className="justify-start items-start gap-2.5 flex">
                  <div
                    className={clsx(
                      "text-[10px] font-medium flex justify-center",
                      {
                        "!text-white":
                          date.getFullYear() === new Date().getFullYear() &&
                          date.getMonth() === new Date().getMonth() &&
                          date.getDate() === new Date().getDate(),
                        "text-zinc-800 opacity-50":
                          date.getMonth() !== month - 1 &&
                          !(
                            date.getMonth() === new Date().getMonth() &&
                            date.getDate() === new Date().getDate()
                          ),
                      }
                    )}
                  >
                    {date.getDate() < 10
                      ? `0${date.getDate()}`
                      : date.getDate()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
