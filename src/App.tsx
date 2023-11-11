import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="flex justify-between h-[50px]  items-center ">
      
      <div className="px-5">
        <div>kakao i connect Center</div>
      </div>
      
      <div className="flex gap-5 text-green-300">
        <div>주요 기능</div>
        <div>활용 사례</div>
        <div>요금제</div>
        <div>고객 지원</div>
      </div>
      
      <div className="flex gap-10 px-5 ">
        <div className="bg-white px-5 py-2">로그인</div>
        <div className="rounded-full hover:brightness-90 bg-yellow-500 px-5 py-2">구독하기</div>
        <div className="rounded-full text-white bg-black px-5 py-2">consloe </div>
      </div>
    </div>
  );
}

export default App;
