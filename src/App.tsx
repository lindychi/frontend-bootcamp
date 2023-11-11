import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App flex justify-between height h-[87px] items-center font-semibold px-20">
      <div>
        <div>Kakao i connect center</div>
      </div>

      <div className="flex justify-between items-center gap-8 text-gray-500">
       <div  className="py-3">주요 기능</div>
       <div  className="py-3">활용 사례</div>
       <div  className="py-3">요금제</div>
       <div  className="py-3">고객 지원</div>
      </div>
  

      <div className="flex justify-beween items-center gap-3">
        <div className="py-3 px-5 rounded-full">로그인</div>
        <div className="bg-gray-200 h-5 w-0.5"></div>
        <div className="bg-yellow-400 py-3 px-5 rounded-full">구독하기</div>
        <div className="text-white bg-black py-3 px-5 rounded-full">console</div>
    </div>

    <div>
      c kakao enterpirse corp.

    </div>
</div>

  );
}

export default App;
