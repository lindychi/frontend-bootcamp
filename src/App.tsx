import React from "react";
import "./App.css"; 
import { todoData } from "./consts/todoList";
import "./styles.css";  // styles.css 파일 불러온다




function App() {
 
  // TODO 상태인 항목들만 필터링
  const todoList = todoData.filter((item) => item.progress === "TODO");
  const doneList = todoData.filter((item) => item.progress === "DONE");

  const MySVGIcon = () => (
    <div style={{ width: 24, height: 24 }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" fill="none" width="100%" height="100%">
        <path d="M0.737061 14.2498H45.856C50.8397 14.2498 54.8797 18.2898 54.8797 23.2735V33.5864C54.8797 37.8582 51.4168 41.3211 47.1451 41.3211H27.8084C12.8573 41.3211 0.737061 29.2008 0.737061 14.2498Z" fill="#D9D9D9"/>
      </svg>
    </div>
  );

    const priorityColor = {
      high: "#E42C5F",
      medium: "#ECB800",
      low: "#2D41A7",
      default: "#D9D9D9",
    };
  



  
  return (
    <div className="FRAME flex justify-center gap-10 bg-blue-800">
      <div className="w-[481px] h-screen bg-blue-100 rounded-lg p-6">
        <div className="To-Do flex justify-auto"> 
          <div className="pr-4"><TodoIcon /></div>
          <div className="styled-head">to-do</div>
        </div>
        
        
          {todoList.map((item, index)=> 
            <div key={index} className="Task p-6 bg-white rounded-lg mt-6 mb-6">
              <div className="frame1 styled-title pb-8">{item.title}</div>
              <div className="frame2-1 flex w=[156px] space-x-3 items-center ">
                  <div className="styled-Date p-2 rounded-lg">{item.dueDate}</div>
                  <div className="frame2-2 flex gap-2">
                    <div className="priority"><MySVGIcon /></div>
                    <div className="Priority"><MySVGIcon /></div>
                    <div className="Priority"><MySVGIcon /></div>
              </div>
                  <div className="frame2-3 styled-name w-[291.5px] ">
                  <div className="text-right">{item.author}</div>
                </div>
              </div>
            </div>  
          )}
      </div>

      <div className="w-[481px] h-screen bg-blue-100 rounded-lg p-6">
        <div className="To-Do flex justify-auto"> 
          <div className="pr-4"><DoneIcon /></div>
          <div className="styled-head">Done</div>
        </div>
        
        
          {doneList.map((item, index)=> 
            <div key={index} className="Task p-6 bg-white rounded-lg mt-6 mb-6">
              <div className="frame1 styled-title pb-8">{item.title}</div>
              <div className="frame2-1 flex w=[156px] space-x-3 items-center ">
                  <div className="bg-[#E42C5F] styled-Date p-2 rounded-lg">{item.dueDate}</div>
                  <div className="frame2-2 flex gap-2">
                    <div className="Priority"><MySVGIcon /></div>
                    <div className="Priority"><MySVGIcon /></div>
                    <div className="Priority"><MySVGIcon /></div>
              </div>
                  <div className="frame2-3 styled-name w-[291.5px] ">
                  <div className="text-right">{item.author}</div>
                </div>
              </div>
            </div>  
          )}
      </div>
    </div>  

            




  );
};

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
