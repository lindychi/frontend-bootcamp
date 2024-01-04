import React from "react";
import clsx from "clsx";

import Hamburger from "../../../icons/Hamburger";
import { CalendarType } from "../../../types/common";
import { getMonthString } from "../../../libs/calendar";
import SelectBox from "../../SelectBox";
import { useNavigate } from "react-router-dom";
import Search from "../../../icons/Search";
import Plus from "../../../icons/Plus";
import MonthCalendar from "../../MonthCalendar";
import YearCalendar from "../../YearCalendar";
import DayCalendar from "../../DayCalendar";
import WeekCalendar from "../../WeekCalendar";
import { calendarTypeList } from "../../../consts/calendar";

type Props = { calendarType: CalendarType };

export default function CalendarRightLayout({ calendarType }: Props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const navigate = useNavigate();

  return (
    <div
      className={clsx([
        "grow shrink basis-0 min-h-screen flex-col justify-start items-center inline-flex",
        {
          "h-screen": calendarType === "month",
          "h-fit": calendarType === "year",
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
              {calendarType !== "year" && (
                <span className="text-zinc-800 text-3xl font-medium">
                  {getMonthString(selectedDate.getMonth() + 1)}
                </span>
              )}
              <span className="text-zinc-800 text-3xl font-normal">
                {selectedDate.getFullYear()}
              </span>
            </div>
          </div>
          <SelectBox
            options={calendarTypeList}
            selectedOption={
              calendarTypeList.find((type) => type.key === calendarType) ??
              calendarTypeList[0]
            }
            onClick={(select) => {
              navigate(`/${select.key}`);
            }}
          />
        </div>
        <div className="justify-start items-center gap-4 flex">
          <Search />

          <div className="w-[98px] p-2 bg-primary rounded-[3px] justify-center items-center gap-1 flex relative">
            <div className="justify-start items-start gap-2.5 flex">
              <div className="text-white text-xs font-medium">Add event</div>
            </div>
            <Plus />

            {/* <div className="absolute -top-1 -right-1 bg-white rounded-xl p-4 shadow-2xl z-10">
                  <div className="flex flex-col">
                    <div className="flex">
                      <label htmlFor="title" className="w-[75px]">
                        제목:
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="border-b"
                      />
                    </div>
                    <div className="flex">
                      <label htmlFor="startedAt" className="w-[75px]">
                        시작 시간:
                      </label>
                      <input
                        type="datetime-local"
                        id="startedAt"
                        name="startedAt"
                        required
                        className="border-b"
                      />
                    </div>
                    <div className="flex">
                      <label htmlFor="endedAt" className="w-[75px]">
                        종료 시간:
                      </label>
                      <input
                        type="datetime-local"
                        id="endedAt"
                        name="endedAt"
                        className="border-b"
                      />
                    </div>
                    <div className="flex">
                      <label htmlFor="category">카테고리:</label>
                      <select id="category" name="category">
                        <option value="">Select a category</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <button className="bg-blue-500 text-white hover:brightness-75">
                      추가
                    </button>
                  </div>
                </div> */}
          </div>
        </div>
      </div>
      {calendarType === "month" && (
        <MonthCalendar
          year={selectedDate.getFullYear()}
          month={selectedDate.getMonth() + 1}
        />
      )}
      {calendarType === "year" && (
        <YearCalendar year={selectedDate.getFullYear()} />
      )}
      {calendarType === "day" && (
        <DayCalendar
          year={selectedDate.getFullYear()}
          month={selectedDate.getMonth()}
          day={selectedDate.getDate()}
        />
      )}
      {calendarType === "week" && (
        <WeekCalendar
          year={selectedDate.getFullYear()}
          month={selectedDate.getMonth()}
          day={selectedDate.getDate()}
        />
      )}
    </div>
  );
}
