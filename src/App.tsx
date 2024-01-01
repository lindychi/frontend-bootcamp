import React from "react";
import clsx from "clsx";
import "./App.css";

import { calendarTypeList } from "./consts/calendar";

import { getMonthString } from "./libs/calendar";

import SelectBox from "./components/SelectBox";
import MonthCalendar from "./components/MonthCalendar";
import SmallMonthCalendar from "./components/SmallMonthCalendar";
import YearCalendar from "./components/YearCalendar";

import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";

function App() {
  const [selectedMonth, setSelectedMonth] = React.useState(1);
  const [selectedYear, setSelectedYear] = React.useState(2024);
  const [selectedCalendarType, setSelectedCalendarType] = React.useState(
    calendarTypeList[0]
  );

  return (
    <div className="min-w-screen min-h-screen h-fit">
      <div className="w-screen min-h-screen h-fit bg-white rounded-md border border-neutral-400 border-opacity-60 justify-start items-start inline-flex">
        {/* 좌측 항목 */}
        <div className="w-[250px] self-stretch bg-white border-r border-gray-300 flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-[47px] px-4 py-2.5 flex-col justify-start items-start gap-2.5 flex">
            <div className="justify-start items-start gap-2.5 inline-flex">
              <div className="text-zinc-800 text-lg font-medium">
                {getMonthString(selectedMonth)}
              </div>
            </div>
          </div>
          <SmallMonthCalendar year={selectedYear} month={selectedMonth} />
        </div>

        {/* 우측 항목 */}
        <div
          className={clsx([
            "grow shrink basis-0 min-h-screen flex-col justify-start items-center inline-flex",
            {
              "h-screen": selectedCalendarType.key === "month",
              "h-fit": selectedCalendarType.key === "year",
            },
          ])}
        >
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
          {selectedCalendarType.key === "month" && (
            <MonthCalendar year={selectedYear} month={selectedMonth} />
          )}
          {selectedCalendarType.key === "year" && (
            <YearCalendar year={selectedYear} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
