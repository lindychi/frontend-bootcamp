import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { FiThumbsUp } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";

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
  <div className="flex flex-row justify-between"> 
    <div className="flex flex-col gap-y-3 text-xs">
      <div className="font-medium">@KaKao Enterprise Corp.</div>
        <div>
          <div>(주)카카오엔터프라이즈 대표이사:이경진 주소:경기도 성남시 분당구 판교역로 235, 7층</div>
          <div> 사업자등록번호 : 123-45-67989 (사업자 정보 확인)  통신판매번호 : 2020-성남분당B-0444 </div>
        </div>
      <div className="flex flex-row gap-5">
        <div className="bg-slate-200 w-5 h-5 rounded-full"></div>
        <div className="bg-slate-300 w-5 h-5 rounded-full"></div>
        <div className="bg-slate-400 w-5 h-5 rounded-full"></div>
        <div className="bg-slate-500 w-5 h-5 rounded-full"></div>
      </div>
    </div >

    <div className="flex flex-row text-xs text-zinc-500 gap-2 justify-items-start">
      <div className="flex flex-row py-1 gap-1 hover:text-zinc-950 hover:font-bold">
        <div>회사정보</div>
        <div>v</div>
      </div>
      <div className="py-1 hover:text-zinc-950 hover:font-bold">개인정보처리방침</div>
      <div className="py-1 hover:text-zinc-950 hover:font-bold">서비스이용약관</div>
      <div className="py-1 hover:text-zinc-950 hover:font-bold">공지사항</div>
      <div className="py-1 hover:text-zinc-950 hover:font-bold">대표메일</div>
      <div className="flex flex-row bg-slate-200 text-zinc-700 hover:text-zinc-950 hover:font-bold h-6 rounded-full px-2 py-1 gap-3">
        <div>관련사이트</div>
        <div>+</div>
      </div>
    </div>
  </div>
</div>
<div className="bg-black p-5">
  <div className="flex flex-row justify-between p-3">
    <div className="flex flex-row gap-3">
      <div className="text-zinc-200">三</div>
      <div className="flex flex-row">
        <div className="bg-red-500 rounded-md text-white w-8 h-6 px-2 py-0.2">▶</div>
        <div className="text-white text-[18px]">YouTube</div>
        <div className="text-white text-[8px]">KR</div>
      </div>
    </div>
    <div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-row">
          <div className="w-[500px] h-[30px] border-[1px] rounded-l-full border-zinc-500 text-zinc-500 px-3 grid items-center text-[13px]">검색</div>
          <div className="w-[40px] h-[30px] bg-zinc-500 rounded-r-full text-zinc-100 grid justify-center items-center"><FaSearch /></div>
        </div>
        <div className="w-[30px] h-[30px] bg-zinc-500 rounded-full text-zinc-100 grid justify-center items-center"><FaMicrophone /></div>
      </div>
    </div>
    <div className="flex flex-row gap-4">
      <div className="text-white">+</div>
      <div className="text-white">종</div>
      <div className="w-[25px] h-[25px] bg-zinc-500 rounded-full text-zinc-100 grid justify-center">user</div>
    </div>
  </div>

  <div className="flex flex-row p-2">
  <div className="flex-col grid gap-y-3 py-3">
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white"><GoHomeFill size="25" /></div>
        <div className="text-white">홈</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white"><SiYoutubeshorts size="25" /></div>
        <div className="text-white">Shorts</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">a</div>
        <div className="text-white">구독</div>
      </div>
      <div className="h-[10px]"></div>
      
      <div className="text-white border-t-[1px] w-[200px] border-white"></div>
      
      <div className="text-white flex flex-row gap-4 h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">나</div>
        <div className="text-white"> - </div>
      </div>
      <div className="text-white flex flex-row gap-4 h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">a</div>
        
        <div className="text-white">시청기록</div>
      </div>
      <div className="text-white flex flex-row gap-4 h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white"><MdAccessTime size="25"/></div>
        <div className="text-white">나중에 볼 동영상</div>
      </div>
      <div className="text-white flex flex-row gap-4  h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white"><FiThumbsUp size="25" /></div>
        <div className="text-white">좋아요 표시한 동영상</div>
      </div>
      <div className="h-[10px]"></div>

      <div className="text-white border-t-[1px] w-[200px] border-white"></div>


      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">구독</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white rounded-full w-6 h-6 bg-slate-100 grid justify-center">a</div>
        <div className="text-white">팔로우1</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white rounded-full w-6 h-6 bg-slate-300 grid justify-center">a</div>
        <div className="text-white">팔로우2</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white border-white border-[1px] rounded-full w-6 h-6 grid justify-center">+</div>
        <div className="text-white">채널탐색</div>
      </div>
      <div className="h-[10px]"></div>

      <div className="text-white border-t-[1px] w-[200px] border-white"></div>

      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">탐색</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">a</div>
        <div className="text-white">인기 급상승</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">a</div>
        <div className="text-white">쇼핑</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">a</div>
        <div className="text-white">음악</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">a</div>
        <div className="text-white">영화</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">a</div>
        <div className="text-white">실시간</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">a</div>
        <div className="text-white">게임</div>
      </div>
      <div className="text-white flex flex-row gap-4 w-[150px] h-[30px] rounded-md items-center active:bg-zinc-100/30 p-3">
        <div className="text-white">a</div>
        <div className="text-white">스포츠</div>
      </div>    
  </div>

  <div>
  <div className="flex flex-row gap-3 p-4">
    <div className=" h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">전체</div>
    <div className=" h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">음악</div>
    <div className="h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">실시간</div>
    <div className=" h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">게임</div>
    <div className="h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">뉴스</div>
    <div className="h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">야구</div>
    <div className="h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">만화 영화</div>
    <div className="h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">요리</div>
    <div className="h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">액션 어드벤쳐 게임</div>
    <div className="h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">반려동물</div>
    <div className="h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">최근에 업로드된 동영상</div>
    <div className="h-8 items-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-white active:text-black">새로운 맞춤 동영상</div>
  </div>


  <div className="px-5 py-2 flex flex-row gap-5">
    <div className="grid gap-y-2">
      <div className="bg-zinc-500 w-[380px] h-[210px] rounded-md"></div>
      <div className="flex flex-row">
        <div className="bg-zinc-100 rounded-full w-8 h-8"></div>
        <div className="px-2">
          <div className="text-white">제목</div>
          <div className="text-white text-xs">스폰서</div>
        </div>
      </div>
      <div className="bg-zinc-500 w-[380px] h-8 rounded-full grid justify-items-center items-center">무료로</div>
    </div>
    <div className="grid gap-y-2">
      <div className="bg-zinc-500 w-[380px] h-[210px] rounded-md"></div>
      <div className="flex flex-row">
        <div className="bg-zinc-100 rounded-full w-8 h-8"></div>
        <div className="px-2">
          <div className="text-white">제목</div>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="text-zinc-100 text-sm">채널명</div>
        <div className="text-zinc-100 text-sm">조회수 x만회 * 업데이트일</div>
      </div>
    </div>
  </div>
  </div>

</div>
</div>



</div>

  )
}

export default App;
