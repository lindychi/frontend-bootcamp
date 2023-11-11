import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (<div>
    <div className="app flex flex-row justify-between h-[87px] items-center">
      <div className="font-bold px-5">kakao i connect Center</div>
      <div className="flex flex-row font-semibold gap-8">
        <div>주요 기능</div>
        <div>활용 사례</div>
        <div>요금제</div>
        <div>고객 지원</div>
      </div>
      <div className="font-medium flex flex-row items-center gap-5">
        <div className="py-4 px-6">로그인</div>
        <div className="bg-black h-[20px] w-0.5 flex py-3">  </div>
        <div className="bg-yellow-300 py-2 px-7 rounded-full hover:brightness-90">구독하기</div>
        <div className="bg-black text-white py-2 px-7 rounded-full">Console</div>
      
      </div>
    </div>

<div>
  <div>@KaKao Enterprise Corp.</div>
  <div>
    <div>(주)카카오엔터프라이즈 대표이사:이경진 주소:경기도 성남시 분당구 판교역로 235, 7층</div>
    <div> 사업자등록번호</div>
  </div>
  <div>
    <div className="bg-black w-5 h-5"></div>
    <div className="bg-black"></div>
    <div className="bg-black"></div>
    <div className="bg-black"></div>
  </div> 
</div></div>
  )
}

export default App;
