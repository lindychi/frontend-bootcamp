import React from "react";
import "./App.css";
import { todoData } from "./consts/todoList";
import { HighlightSpanKind } from "typescript";

function App() {
  const todoList = todoData.filter((item) => item.progress === "TODO");
  const doneList = todoData.filter((item) => item.progress === "DONE");

  return (
    <div className="w-screen h-screen justify-center items-center bg-blue-800">
      <div>
        <div className="felx flex-row ">
          <div className="flex flex-row justify-center items-center gap-10 py-20">
            <div className="bg-blue-100 rounded-xl p-6">
              <div className="w-[500px] h-[1000px] flex flex-col gap-6">
                <div className="flex gap-4 text-4xl text-blue-800">
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
                  To-Do
                </div>

                {todoList.map((item, index) => (
                  <div
                    key={index}
                    className=" h-[130px] flex flex-col gap-6 p-6 bg-white rounded-xl"
                  >
                    <div className="text-2xl">{item.title}</div>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill={
                            item.priority === "high"
                              ? "#E42C5F"
                              : item.priority === "medium"
                              ? "#ECB800"
                              : item.priority === "low"
                              ? "#E42C5F"
                              : ""
                          }
                        >
                          <path
                            d="M0.333252 6.5H20.3333C22.5424 6.5 24.3333 8.29086 24.3333 10.5V15.0714C24.3333 16.965 22.7982 18.5 20.9047 18.5H12.3333C5.70584 18.5 0.333252 13.1274 0.333252 6.5Z"
                            fill="#E42C5F"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M0.333252 6.5H20.3333C22.5424 6.5 24.3333 8.29086 24.3333 10.5V15.0714C24.3333 16.965 22.7982 18.5 20.9047 18.5H12.3333C5.70584 18.5 0.333252 13.1274 0.333252 6.5Z"
                            fill="#E42C5F"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M0.333252 6.5H20.3333C22.5424 6.5 24.3333 8.29086 24.3333 10.5V15.0714C24.3333 16.965 22.7982 18.5 20.9047 18.5H12.3333C5.70584 18.5 0.333252 13.1274 0.333252 6.5Z"
                            fill="#E42C5F"
                          />
                        </svg>
                      </div>
                      <div
                        className="text-blue-800
                      text-xl"
                      >
                        {item.author}
                      </div>
                    </div>

                    <div className="hidden">{item.priority}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-100 rounded-xl p-6">
              <div className="w-[500px] h-[900px] flex flex-col gap-6">
                <div className="flex gap-4 text-4xl text-blue-800">
                  <svg
                    width="41"
                    height="40"
                    viewBox="0 0 41 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.375 3.75H9.875C8.83947 3.75 8 4.58947 8 5.625V34.375C8 35.4105 8.83947 36.25 9.875 36.25H31.125C32.1605 36.25 33 35.4105 33 34.375V19.375M17.375 3.75H18C26.2843 3.75 33 10.4657 33 18.75V19.375M17.375 3.75C20.4816 3.75 23 6.2684 23 9.375V11.875C23 12.9105 23.8395 13.75 24.875 13.75H27.375C30.4816 13.75 33 16.2684 33 19.375M15.5 25L19.25 28.75L25.5 20"
                      stroke="#2B1887"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Done
                </div>
                {doneList.map((item, index) => (
                  <div
                    key={index}
                    className=" h-[130px] flex flex-col gap-6 p-6 bg-white rounded-xl"
                  >
                    <div>{item.title}</div>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill={
                            item.priority === "high"
                              ? "#E42C5F"
                              : item.priority === "medium"
                              ? "#ECB800"
                              : item.priority === "low"
                              ? "#E42C5F"
                              : ""
                          }
                        >
                          <path
                            d="M0.333252 6.5H20.3333C22.5424 6.5 24.3333 8.29086 24.3333 10.5V15.0714C24.3333 16.965 22.7982 18.5 20.9047 18.5H12.3333C5.70584 18.5 0.333252 13.1274 0.333252 6.5Z"
                            fill="#E42C5F"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M0.333252 6.5H20.3333C22.5424 6.5 24.3333 8.29086 24.3333 10.5V15.0714C24.3333 16.965 22.7982 18.5 20.9047 18.5H12.3333C5.70584 18.5 0.333252 13.1274 0.333252 6.5Z"
                            fill="#E42C5F"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M0.333252 6.5H20.3333C22.5424 6.5 24.3333 8.29086 24.3333 10.5V15.0714C24.3333 16.965 22.7982 18.5 20.9047 18.5H12.3333C5.70584 18.5 0.333252 13.1274 0.333252 6.5Z"
                            fill="#E42C5F"
                          />
                        </svg>
                      </div>
                      <div
                        className="text-blue-800
                      text-xl"
                      >
                        {item.author}
                      </div>
                    </div>

                    <div className="hidden">{item.priority}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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

export const DoneIcon = () => {
  return (
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.375 3.75H9.875C8.83947 3.75 8 4.58947 8 5.625V34.375C8 35.4105 8.83947 36.25 9.875 36.25H31.125C32.1605 36.25 33 35.4105 33 34.375V19.375M17.375 3.75H18C26.2843 3.75 33 10.4657 33 18.75V19.375M17.375 3.75C20.4816 3.75 23 6.2684 23 9.375V11.875C23 12.9105 23.8395 13.75 24.875 13.75H27.375C30.4816 13.75 33 16.2684 33 19.375M15.5 25L19.25 28.75L25.5 20"
        stroke="#2B1887"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default App;
