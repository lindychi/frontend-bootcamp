import React from "react";
import clsx from "clsx";
import "./App.css";

import { calendarTypeList, dayList } from "./consts/calendar";

import { getCalendarDates, getMonthString } from "./libs/calendar";

import SelectBox from "./components/SelectBox";
import MonthCalendar from "./components/MonthCalendar";

import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";

function App() {
  const [selectedMonth, setSelectedMonth] = React.useState(12);
  const [selectedYear, setSelectedYear] = React.useState(2023);
  const targetCalendarDates = getCalendarDates(selectedYear, selectedMonth);
  const [selectedCalendarType, setSelectedCalendarType] = React.useState(
    calendarTypeList[0]
  );

  return (
    <div className="w-full h-full min-w-screen min-h-screen">
      <div className="w-screen h-screen bg-white rounded-md border border-neutral-400 border-opacity-60 justify-start items-start inline-flex">
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

        {/* 우측 항목 */}
        <div className="grow shrink basis-0 h-screen pl-px flex-col justify-start items-center inline-flex">
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
              <SelectBox
                options={calendarTypeList}
                selectedOption={selectedCalendarType}
                onClick={(select) => {
                  setSelectedCalendarType(select);
                }}
              />
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
          {selectedCalendarType.key === "month" && <MonthCalendar />}
        </div>
      </div>
    </div>
  );
}

export default App;
