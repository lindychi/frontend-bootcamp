import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube, FaMicrophone } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdOutlineVideoCall } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./App.css";

function App() {
  return (
    <div className="flex flex-row w-full h-[60px] bg-black text-white">
      <div className="flex flex-row w-[500px] h-[50px] px-6 py-2 gap-8">
        <RxHamburgerMenu size="25" />
        <FaYoutube size="25" />ß
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
        <MdOutlineVideoCall size="40" />
        <CiBellOn size="40" />
        <IoPersonCircleOutline size="40" />
      </div>
    </div>
  );
}

export default App;
