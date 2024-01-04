import React, { useEffect } from "react";
import clsx from "clsx";
import { HttpStatusCode } from "axios";
import "./App.css";

import { calendarTypeList } from "./consts/calendar";

import { Category } from "./types/common";

import { getMonthString } from "./libs/calendar";

import { getCategories } from "./services/categoryService";
import { AddTodoRequest, addTodo } from "./services/todoService";

import SelectBox from "./components/SelectBox";
import MonthCalendar from "./components/MonthCalendar";
import SmallMonthCalendar from "./components/SmallMonthCalendar";
import YearCalendar from "./components/YearCalendar";
import DayCalendar from "./components/DayCalendar";
import WeekCalendar from "./components/WeekCalendar";

import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";

function App() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedCalendarType, setSelectedCalendarType] = React.useState(
    calendarTypeList[0]
  );
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [addTodoRequest, setAddTodoRequest] = React.useState<
    Partial<AddTodoRequest>
  >({});

  const loadCategories = async () => {
    const result = await getCategories();
    if (result.status === HttpStatusCode.Ok) {
      setCategories(result.data);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="min-w-screen min-h-screen h-fit">
      <div className="w-screen min-h-screen h-fit bg-white rounded-md border border-neutral-400 border-opacity-60 justify-start items-start inline-flex">
        {/* 좌측 항목 */}
        <div className="w-[250px] self-stretch bg-white border-r border-gray-300 flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-[47px] px-4 py-2.5 flex-col justify-start items-start gap-2.5 flex">
            <div className="justify-start items-start gap-2.5 inline-flex">
              <div className="text-zinc-800 text-lg font-medium">
                {getMonthString(selectedDate.getMonth() + 1)}
              </div>
            </div>
          </div>
          <SmallMonthCalendar
            year={selectedDate.getFullYear()}
            month={selectedDate.getMonth()}
          />

          {categories.map((category) => (
            <div
              key={category.id}
              className="self-stretch h-[47px] px-4 py-2.5 flex-col justify-start items-start gap-2.5 flex"
            >
              <div className="inline-flex justify-between w-full relative">
                <div className="justify-start items-center gap-2.5 inline-flex">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <div className="text-zinc-800 text-lg font-medium">
                    {category.title}
                  </div>
                </div>
                <div
                  className={clsx([
                    "text-xl cursor-pointer transition-all",
                    { "rotate-45": addTodoRequest.category === category.id },
                  ])}
                  onClick={() => {
                    if (addTodoRequest.category === category.id) {
                      setAddTodoRequest({});
                    } else {
                      setAddTodoRequest({
                        category: category.id,
                      });
                    }
                  }}
                >
                  +
                </div>

                <div
                  className={clsx([
                    "absolute left-[105%] bg-white rounded-xl shadow-2xl z-10 transition-all overflow-hidden duration-300 -translate-y-1/2 top-1/2",
                    {
                      "w-0": addTodoRequest.category !== category.id,
                      "w-[320px]": addTodoRequest.category === category.id,
                    },
                  ])}
                >
                  <div className="flex p-4 w-[320px] gap-2 items-center">
                    <label htmlFor="title">할 일</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      className="border-b"
                      value={addTodoRequest.title || ""}
                      onChange={(e) => {
                        setAddTodoRequest({
                          ...addTodoRequest,
                          title: e.target.value,
                        });
                      }}
                    />
                    <button
                      className="text-white hover:brightness-75 px-2 py-1"
                      style={{ backgroundColor: category.color }}
                      onClick={async () => {
                        const result = await addTodo(
                          addTodoRequest as AddTodoRequest
                        );
                        if (result.status === HttpStatusCode.Ok) {
                          setAddTodoRequest({});
                        } else {
                          alert("추가 실패");
                        }
                      }}
                    >
                      추가
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
                  {selectedCalendarType.key !== "year" && (
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
                selectedOption={selectedCalendarType}
                onClick={(select) => {
                  setSelectedCalendarType(select);
                }}
              />
            </div>
            <div className="justify-start items-center gap-4 flex">
              <Search />

              <div className="w-[98px] p-2 bg-primary rounded-[3px] justify-center items-center gap-1 flex relative">
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
            <MonthCalendar
              year={selectedDate.getFullYear()}
              month={selectedDate.getMonth() + 1}
            />
          )}
          {selectedCalendarType.key === "year" && (
            <YearCalendar year={selectedDate.getFullYear()} />
          )}
          {selectedCalendarType.key === "day" && (
            <DayCalendar
              year={selectedDate.getFullYear()}
              month={selectedDate.getMonth()}
              day={selectedDate.getDate()}
            />
          )}
          {selectedCalendarType.key === "week" && (
            <WeekCalendar
              year={selectedDate.getFullYear()}
              month={selectedDate.getMonth()}
              day={selectedDate.getDate()}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
