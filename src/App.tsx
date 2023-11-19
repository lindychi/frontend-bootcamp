import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube, FaMicrophone } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdOutlineVideoCall } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./App.css";
const list = [
  "전체",
  "음악",
  "실시간",
  "게임",
  "뉴스",
  "야구",
  "만화 영화",
  "요리",
  "액션 어드벤쳐 게임",
  "반려동물",
  "최근에 업로드된 동영상",
  "새로운 맞춤 동영상",
];
function App() {
  return (
    <div className="bg-black text-white">
      <div className="flex flex-row justify-between items-center  bg-black text-white p-1">
        <div className="flex flex-row w-[500px] h-[50px] px-6 py-2 gap-8">
          <RxHamburgerMenu size="25" />
          <div className="flex flex-row">
            <FaYoutube size="25" />
            <div className="">youtube</div>
            <div className="text-xs">kr</div>
          </div>
        </div>
        <div className="flex flex-row w-[1300px] h-[55px] items-center bg-black text-white gap-5">
          <div className="flex flex-row border border-white rounded-full">
            <input
              className="focus:outline-none px-6 placeholder:italic placeholder:text-white block w-[700px] h-[45px] rounded-l-3xl bg-zinc-900"
              placeholder="검색"
              type="text"
              name="search"
            />
            <div className="flex justify-center items-center  w-[70px]  rounded-r-3xl bg-zinc-700 ">
              <CiSearch size="25" />
            </div>
          </div>
          <div className="flex items-center px-3 py-3 rounded-full bg-zinc-700 bg-auto">
            <FaMicrophone size="25" />
          </div>
        </div>

        <div className="flex flex-row w-[400px] bg-black gap-5">
          <MdOutlineVideoCall size="35" />
          <CiBellOn size="35" />
          <IoPersonCircleOutline size="35" />
        </div>
      </div>
      <div className="flex flex-row p-3  bg-black "></div>
      <div className="flex-col grid gap-y-3 w-[200px]">
        {list.map((item) => (
          <div className="w-[200px] h-[30px]">{item}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
