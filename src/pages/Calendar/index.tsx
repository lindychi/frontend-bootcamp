import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../libs/supabase";
import clsx from "clsx";
import ExecutableTodoItem from "../../components/ExecutableTodoItem";
import { AddTodoRequest } from "../../services/todoService";
import { getCategoriesWithTodo } from "../../services/categoryService";
import { HttpStatusCode } from "axios";
import SmallMonthCalendar from "../../components/SmallMonthCalendar";
import { getMonthString } from "../../libs/calendar";
import { Category } from "../../types/common";
import { useQuery } from "react-query";
import AddTodo from "../../components/AddTodo";
import CalendarRightLayout from "../../components/Layout/CalendarRight";

type Props = {};

export default function Calendar({}: Props) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const loadCategories = async () => {
    const result = await getCategoriesWithTodo();
    if (result.status === HttpStatusCode.Ok) {
      return result.data;
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

  const [addTodoRequest, setAddTodoRequest] = React.useState<
    Partial<AddTodoRequest>
  >({});

  const { data: categories } = useQuery(["categories"], loadCategories);

  const checkLogin = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data) {
      navigate("/login");
    }
  };

  useEffect(() => {
    //  로그인 토큰 없으면 로그인 페이지로 이동
    checkLogin();
  }, []);

  return (
    <>
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

            {categories?.map((category) => (
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
                {category.todos
                  .filter((todo) => todo.progress !== "done")
                  ?.map((todo) => (
                    <ExecutableTodoItem
                      key={todo.id}
                      todo={todo}
                      onSuccess={() => {
                        loadCategories();
                      }}
                    />
                  ))}
              </div>
            ))}
          </div>

          <CalendarRightLayout />
        </div>
      </div>
    </>
  );
}
