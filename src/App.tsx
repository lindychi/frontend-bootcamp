import React, { useEffect } from "react";
import clsx from "clsx";
import { HttpStatusCode } from "axios";
import "./App.css";

import { calendarTypeList } from "./consts/calendar";

import { Category, CategoryWithTodo } from "./types/common";

import { getMonthString } from "./libs/calendar";

import { getCategoriesWithTodo } from "./services/categoryService";
import { AddTodoRequest } from "./services/todoService";

import SelectBox from "./components/SelectBox";
import MonthCalendar from "./components/MonthCalendar";
import SmallMonthCalendar from "./components/SmallMonthCalendar";
import YearCalendar from "./components/YearCalendar";
import DayCalendar from "./components/DayCalendar";
import WeekCalendar from "./components/WeekCalendar";
import AddTodo from "./components/AddTodo";

import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";

function App() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedCalendarType, setSelectedCalendarType] = React.useState(
    calendarTypeList[0]
  );
  const [categories, setCategories] = React.useState<CategoryWithTodo[]>([]);
  const [addTodoRequest, setAddTodoRequest] = React.useState<
    Partial<AddTodoRequest>
  >({});

  const loadCategories = async () => {
    const result = await getCategoriesWithTodo();
    if (result.status === HttpStatusCode.Ok) {
      setCategories(result.data);
    }
  };

  const handleShowAddTodo = (category: Category) => {
    if (addTodoRequest.category === category.id) {
      setAddTodoRequest({});
    } else {
      setAddTodoRequest({
        category: category.id,
      });
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
              className="self-stretch px-4 py-2.5 flex-col justify-start items-start gap-2.5 flex"
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
                  onClick={() => handleShowAddTodo(category)}
                >
                  +
                </div>

                <div
                  className={clsx([
                    "absolute left-[105%] bg-white rounded-xl z-10 transition-all overflow-hidden duration-300 -translate-y-1/2 top-1/2",
                    {
                      "w-0 shadow-none":
                        addTodoRequest.category !== category.id,
                      "w-[320px] shadow-2xl":
                        addTodoRequest.category === category.id,
                    },
                  ])}
                >
                  <AddTodo
                    addTodoRequest={addTodoRequest}
                    category={category}
                    onChange={(text: string) => {
                      setAddTodoRequest({
                        ...addTodoRequest,
                        title: text,
                      });
                    }}
                    onSuccess={() => {
                      setAddTodoRequest({});
                      loadCategories();
                    }}
                  />
                </div>
              </div>
              {category.todos?.map((todo) => (
                <ExecutableTodoItem
                  todo={todo}
                  onSuccess={() => {
                    loadCategories();
                  }}
                />
              ))}
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
