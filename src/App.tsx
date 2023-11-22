import React from "react";
import "./App.css"; 
import { todoData } from "./consts/todoList";
import "./styles.css";  // styles.css 파일 불러온다





function App() {
  const todoDate=[
    {
      progress: "DONE",
      title: "3주차 과제 노티하기",
      level: 2,
      priority: "medium",
      dueDate: "Tue",
      author: "한치",
    },
    {
      progress: "TODO",
      title: "3주차 과제",
      level: 3,
      priority: "high",
      dueDate: "Sat",
      author: "라라",
    },
    {
      progress: "TODO",
      title: "3주차 과제",
      level: 3,
      priority: "high",
      dueDate: "Sat",
      author: "루나",
    },
    {
      progress: "TODO",
      title: "3주차 과제",
      level: 3,
      priority: "high",
      dueDate: "Sat",
      author: "김기혁",
    },
    {
      progress: "DONE",
      title: "투두 데이터 준비",
      level: 1,
      priority: "high",
      dueDate: "Mon",
      author: "한치",
    },
    {
      progress: "DONE",
      title: "샘플 사이트 작성",
      level: 3,
      priority: "high",
      dueDate: "Mon",
      author: "한치",
    },
    {
      progress: "TODO",
      title: "강습생 별 브랜치 준비",
      level: 2,
      priority: "high",
      dueDate: "Mon",
      author: "한치",
    },
    {
      progress: "TODO",
      title: "피그마 개발자 모드 가이드",
      level: 1,
      priority: "medium",
      dueDate: "Mon",
      author: "한치",
    },
    {
      progress: "TODO",
      title: "VSCODE 새로고침 하는 법 가이드",
      level: 1,
      priority: "low",
      dueDate: "Sat",
      author: "한치",
    },
  ]

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

  // TODO 리스트를 렌더링하는 React 컴포넌트
// const TodoList = () => {
//   return (
//     <div>
//       <h2>TODO List</h2>
//       <ul>
//         {todoList.map((todoItem, index) => (
//           <li key={index}>{todoItem.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

  

  

  

  return (
    <div className="FRAME flex justify-center gap-10 bg-blue-800">
      <div className="w-[481px] h-screen bg-blue-100 rounded-lg p-6">
        <div className="To-Do flex justify-auto mb-6"> 
          <div className="pr-4"><TodoIcon /></div>
          <div className="styled-head">To-Do</div>
        </div>
        <div className="Task p-6 bg-white rounded-lg">
          <div className="frame1 styled-title pb-8">Iam task</div>
          <div className="frame2 flex justify-start w=[156px] space-x-3 items-center">
            <div className="bg-[#E42C5F] styled-Date p-2 rounded-lg">Mon</div>
            <div className="Priority"><MySVGIcon /></div>
            <div className="Priority"><MySVGIcon /></div>
            <div className="Priority"><MySVGIcon /></div>
            <div className="frame3 styled-name justify-end">name</div>
          </div>  
          
            
        </div>
      </div>

      <div className="w-[528.5px] h-screen bg-blue-100 rounded-lg"></div>
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
