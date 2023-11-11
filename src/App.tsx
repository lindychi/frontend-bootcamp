import React from "react";
import "./App.css";

function App() {
  return (
    <div className="w-full flex justify-between h-[87px] bg-slate-300 items-center font-semibold scroll-px-40">
      <div>kakao i connect center</div>
      <div className="flex gap-2 text-neutral-500">
        <div className="hover:text-neutral-950">주요 기능</div>
        <div className="hover:text-neutral-950">활용 사례</div>
        <div className="hover:text-neutral-950">요금제</div>
        <div className="hover:text-neutral-950">고객 지원</div>
      </div>
      <div className="flex items-center gap-2">
        <div>로그인</div>
        <div className="hover:brightness-90 bg-yellow-400 px-3 py-1 rounded-full">
          구독하기
        </div>
        <div className="text-white bg-black px-3 py-1 rounded-full">
          Console
        </div>
      </div>
    </div>
  );
}

export default App;
