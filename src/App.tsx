import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaEarthAmericas } from "react-icons/fa6";


function App() {
  const jsonlist =[
    { icon:"a", title:"홈"},
    { icon:"b", title:"Shorts"},
    { icon:"c", title:"구독"}

  ]
  
    // ddkdkd 안닫아도 됨 내용물 치고 컨트롤 물음표  이것은 문자열 리스트
  //   "음악",
  //   "BTS",
  //   "김남준",
  //   "김석진",
  //   "민윤기",
  //   "정호석",
  //   "박지민",
  //   "김태형",
  //   "전정국",
  //   "최근에 업로드 된 GOLDEN ",
  // ] 
  
   const list =["asdf"]
  return (
    <div>
      <div className="flex justify-between height h-[88px] items-center font-semibold px-2 border-2">
        <div className="logo flex justify-start py-5">
          <div className="px-2 py-3 border-2"><GiHamburgerMenu /></div>          
          <div className="px-2 py-3 border-2">youtube</div>
        </div>

        <div className="searchbar flex justify-between border-2">
          <div className="box-border width w-[500px] py-3 px-5 rounded-r rounded-full text-gray-500 border-2">검색</div>
          <div className="box-border px-3 py-3 rounded-l rounded-full text-gray-500 border-2">🔍</div>
          <div className="ml-4 bg-gray-100 px-5 py-3 rounded-full">S</div> 
        </div>

        <div className="Right flex justify-between border-2">
          <div className="py-3 px-5 border-2">C</div>
          <div className="py-3 px-5 border-2">B</div>          
          <div className="Text-white bg-blue-400 py-3 px-5 rounded-full">S</div> 
        </div>
    </div>

    
    <div className="CONTENTS flex">
      <div className="CONTENTS1  py-2 px-2">
        <div className="SIDEMENU">
        {jsonlist.map((items, index) => (
          <div className="flex justify-items-start py-1">
              <div className="ICON px-2 border-2">{items.icon}</div>
              <div className="SideMenu">{items.title}</div>
              </div>
          ))}
        
        <div className="flex justify-items-start py-1">
            <div className="ICON px-2 border-2">🎡</div>
            <div className="SideMenu">Shorts</div>
        </div>
        <div className="flex justify-items-start py-1">
            <div className="ICON px-2 border-2">🎃</div>
            <div className="SideMenu">구독</div>
        </div>
      </div>

        <br></br>
        <div className="bg-gray-200 h-0.5"></div>
        

        <div className="CONTENTS2 py-3">
          <div className="flex justify-items-start py-1 gap-3">
            <div className="ICON border-2">나</div>
            <div className="SideMenu">❤</div>
          </div>  
          <div className="flex justify-items-start py-1">
            <div className="ICON px-2 border-2">😀</div>
            <div className="SideMenu border-2 pl-2">내 채널</div>
          </div>        
          <div className="flex justify-items-start py-1">
            <div className="ICON px-2 border-2">😎</div>
            <div className="SideMenu border-2 pl-2">시청기록</div>
          </div>        
          <div className="flex justify-items-start py-1">
            <div className="ICON px-2 border-2">🎞</div>
            <div className="SideMenu border-2 pl-2">내 동영상</div>
          </div>
          <div className="flex justify-items-start py-1">
            <div className="ICON px-2 border-2">🎵</div>
            <div className="SideMenu border-2 pl-2">나중에 볼 동영상</div>
          </div>
          <div className="flex justify-items-start py-1">
            <div className="ICON px-2 border-2">🎁</div>
            <div className="SideMenu border-2 pl-2">더보기</div>
          </div>
        </div>
      </div>
    
      <div className="CONTENTS2 pl-5">
        <div className="Keyword flex border-2 py-2 gap-3">
          {list.map((item)=><div className="keyword bg-zinc-100 px-2 py-1 rounded-md">{item}</div>)}
          <div className="keyword bg-black text-white px-2 py-1 rounded-md">전체</div>
          <div className="keyword bg-zinc-100 px-2 py-1 rounded-md">BTS</div>
          <div className="keyword bg-zinc-100 px-2 py-1 rounded-md">김남준</div>
          <div className="keyword bg-zinc-100 px-2 py-1 rounded-md">김석진</div>
          <div className="keyword bg-zinc-100 px-2 py-1 rounded-md">민윤기</div>
          <div className="keyword bg-zinc-100 px-2 py-1 rounded-md">정호석</div>
          <div className="keyword bg-zinc-100 px-2 py-1 rounded-md">박지민</div>
          <div className="keyword bg-zinc-100 px-2 py-1 rounded-md">김태형</div>
          <div className="keyword bg-zinc-100 px-2 py-1 rounded-md">전정국</div>
          <div className="keyword bg-zinc-100 px-2 py-1 rounded-md">최근에 업로드 된 GOLDEN</div>
        </div>
        
        <div className="Video border box-border width w-[330px] height h-[326px] py-10 px-3">
          <div className="box-border width w-[300px] height h-[150px] bg-gray-700 border-2 rounded-md">
          <img src="jnj.jpg" alt="jnj01" style={{ objectFit: 'cover', objectPosition: 'center top', width: '100%', height: '100%' }} />
          </div>
          
          <div className="video flex justify-center py-2">
              <div className="profile text-white height h-[45px] p-2.5 mr-4 bg-violet-700 rounded-full">BTS</div>
            <div className="video text">
              <div className="video text"> BTS (방탄소년단) 'Dynamite' Official MV </div>
              <div className="video text-sm text-gray-500 font-medium "> bangtanTV </div>
              <div className="video text text-sm text-gray-500 font-medium"> 조회수 17억회 . 3년 전 </div>
            </div>
            
          </div>
              
              
        </div>
      </div>
    </div>











        <div className="main flex justify-between items-center gap-3">
          <div className="py-3 px-5 rounded-full">로그인</div>
          <div className="bg-gray-200 h-5 w-0.5"></div>
          <div className="bg-yellow-400 py-3 px-5 rounded-full">구독하기</div>
          <div className="text-white bg-black py-3 px-5 rounded-full">콘솔</div>
        </div>

</div>

  );
}

export default App;
