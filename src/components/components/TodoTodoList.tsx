import React from "react";
import clsx from "clsx";

type Props = {};

export default function TodoTodoList({}: Props) {
  return (
    <div className="bg-blue-100 rounded-xl p-6">
      <div className="w-[500px] h-fit flex flex-col gap-6">
        <div className="flex gap-4 text-4xl text-blue-800">
          <TodoIcon />
          To-Do
        </div>
        {todoList.map((item, index) => (
          <div
            key={index}
            className=" h-[130px] flex flex-col gap-6 p-6 bg-white rounded-xl"
          >
            <div className="flex justify-between">
              <div className="text-2xl">{item.title}</div>
              <button
                onClick={() => {
                  setTodoData(
                    todoData.map((todo) =>
                      item.title === todo.title && item.author === todo.author
                        ? { ...item, process: "Done" }
                        : item
                    )
                  );
                }}
              >
                완료
              </button>
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex flex-row gap-4">
                <div
                  className={`rounded-xl text-white ${
                    item.priority === "high"
                      ? "bg-priority-high"
                      : item.priority === "medium"
                      ? "bg-priority-medium"
                      : item.priority === "low"
                      ? "bg-priority-low"
                      : ""
                  } px-3 py-2`}
                >
                  {item.dueDate}
                </div>
                <SVGIcon item={item} />
              </div>
              <div
                className="text-blue-800
            text-xl"
              >
                {item.author}
              </div>
            </div>
            <div className="hidden">
              {item.priority}
              {item.level}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export const TodoIcon = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.1096 6.47981C25.6652 4.90453 24.2174 3.75 22.5 3.75H17.5C15.7826 3.75 14.3348 4.90453 13.8904 6.47981M26.1096 6.47981C26.2011 6.80417 26.25 7.14637 26.25 7.5V7.5C26.25 8.19036 25.6904 8.75 25 8.75H15C14.3096 8.75 13.75 8.19036 13.75 7.5V7.5C13.75 7.14637 13.7989 6.80417 13.8904 6.47981M26.1096 6.47981C27.1865 6.56114 28.2576 6.66379 29.3222 6.78735C31.1565 7.00023 32.5 8.58167 32.5 10.4283V32.5C32.5 34.5711 30.8211 36.25 28.75 36.25H11.25C9.17893 36.25 7.5 34.5711 7.5 32.5V10.4283C7.5 8.58167 8.84347 7.00023 10.6778 6.78735C11.7424 6.66379 12.8135 6.56114 13.8904 6.47981"
        stroke="#2B1887"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SVGIcon = ({ item }: { item: TodoItem }) => {
  const icons = [];
  for (let i = 0; i < item.level; i++) {
    icons.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z"
          className={clsx({
            "fill-priority-high": item.priority === "high",
            "fill-priority-medium": item.priority === "medium",
            "fill-priority-low": item.priority === "low",
          })}
        />
      </svg>
    );
  }
  for (let i = 3; i > item.level; i--) {
    icons.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z"
          className="fill-priority-inactive"
        />
      </svg>
    );
  }

  return <>{icons}</>;
};
