import React from "react";
import clsx from "clsx";
import "./App.css";

import { dayList } from "./consts/calendar";

import { getCalendarDates, getMonthString } from "./libs/calendar";

import Arrow from "./icons/Arrow";
import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";

function App() {
  const [selectedMonth, setSelectedMonth] = React.useState(12);
  const [selectedYear, setSelectedYear] = React.useState(2023);
  const targetCalendarDates = getCalendarDates(selectedYear, selectedMonth);

  return (
    <div className="w-full h-full min-w-screen min-h-screen">
      <div className="w-[1465px] h-[1024px] bg-white rounded-md border border-neutral-400 border-opacity-60 justify-start items-start inline-flex">
        <div className="w-[250px] self-stretch bg-white border-r border-gray-300 flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-[47px] px-4 py-2.5 flex-col justify-start items-start gap-2.5 flex">
            <div className="justify-start items-start gap-2.5 inline-flex">
              <div className="text-zinc-800 text-lg font-medium">
                {getMonthString(selectedMonth)}
              </div>
            </div>
          </div>
          <div className="self-stretch h-[218px] p-2.5 flex-col justify-start items-start gap-2.5 flex">
            <div className="self-stretch h-[198px] flex-col justify-start items-start flex">
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
                  <div className="w-[30px] h-[33px] p-1 justify-start items-start gap-2.5 inline-flex">
                    <div
                      className={clsx("h-[25px] p-[5px]", {
                        "bg-primary rounded-[99px] justify-center items-center gap-2.5 flex":
                          date.getMonth() === new Date().getMonth() &&
                          date.getDate() === new Date().getDate(),
                        "justify-start items-start gap-2.5 flex":
                          date.getMonth() !== selectedMonth - 1,
                      })}
                    >
                      <div className="justify-start items-start gap-2.5 flex">
                        <div
                          className={clsx("text-[10px] font-medium", {
                            "!text-white":
                              date.getMonth() === new Date().getMonth() &&
                              date.getDate() === new Date().getDate(),
                            "text-zinc-800 opacity-50":
                              date.getMonth() !== selectedMonth - 1 &&
                              !(
                                date.getMonth() === new Date().getMonth() &&
                                date.getDate() === new Date().getDate()
                              ),
                          })}
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
        </div>
        <div className="grow shrink basis-0 h-[1024px] pl-px flex-col justify-center items-center inline-flex">
          <div className="self-stretch p-4 bg-white border-b border-gray-300 border-opacity-60 justify-between items-center inline-flex">
            <div className="justify-start items-center gap-4 flex">
              <div className="justify-start items-start flex">
                <Hamburger />
              </div>
              <div className="justify-start items-start gap-2.5 flex">
                <div className="flex gap-1 items-center">
                  <span className="text-zinc-800 text-3xl font-medium">
                    {getMonthString(selectedMonth)}
                  </span>
                  <span className="text-zinc-800 text-3xl font-normal">
                    {selectedYear}
                  </span>
                </div>
              </div>
              <div className="w-[75px] p-2 rounded-[3px] border border-primary justify-center items-center gap-1 flex">
                <div className="justify-start items-start gap-2.5 flex">
                  <div className="text-primary text-xs font-medium">Month</div>
                </div>
                <Arrow />
              </div>
            </div>
            <div className="justify-start items-center gap-4 flex">
              <Search />

              <div className="w-[98px] p-2 bg-primary rounded-[3px] justify-center items-center gap-1 flex">
                <div className="justify-start items-start gap-2.5 flex">
                  <div className="text-white text-xs font-medium">
                    Add event
                  </div>
                </div>
                <Plus />
              </div>
            </div>
          </div>
          <div className="self-stretch border-b border-gray-300 justify-start items-start inline-flex">
            {dayList.map((dayName) => (
              <div className="grow shrink basis-0 h-6 px-2.5 justify-center items-center gap-2.5 flex">
                <div className="justify-start items-start gap-2.5 flex">
                  <div className="text-zinc-800 text-xs font-medium">
                    {dayName.medium}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-[1214px] h-[923px] justify-center items-center">
            <div className="grow self-stretch justify-start items-start grid grid-cols-7">
              {targetCalendarDates.map((date) => (
                <div
                  className={clsx([
                    "self-stretch grow shrink basis-0 px-1 py-[3px] bg-white border border-gray-300 border-opacity-60 flex-col justify-start items-start gap-2.5 flex h-[184.60px]",
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
