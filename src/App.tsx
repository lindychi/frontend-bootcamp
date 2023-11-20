import React from "react";
import { RxHamburgerMenu, RxCounterClockwiseClock } from "react-icons/rx";
import { FaYoutube, FaMicrophone } from "react-icons/fa";
import { CiSearch, CiBellOn } from "react-icons/ci";
import { MdOutlineVideoCall } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts, SiYoutubegaming } from "react-icons/si";
import { BsCollectionPlay, BsTrophy, BsLightbulb } from "react-icons/bs";
import { FiChevronRight, FiClock, FiRadio } from "react-icons/fi";
import { BiLike, BiMovie } from "react-icons/bi";
import { HiFire } from "react-icons/hi";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { PiMusicNoteThin } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrClose } from "react-icons/gr";

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
const asideflist = [
  { icon: <GoHome />, title: "홈" },
  { icon: <SiYoutubeshorts />, title: "Shorts" },
  { icon: <BsCollectionPlay />, title: "구독" },
];
const asidemlist = [
  { icon: <RxCounterClockwiseClock />, title: "시청  기록" },
  { icon: <FiClock />, title: "나중에 볼 동영상" },
  { icon: <BiLike />, title: "좋아요 표시한 동영상" },
];
const asidem2list = [
  { icon: <RxCounterClockwiseClock />, title: "어조비" },
  { icon: <FiClock />, title: "Jin Heui Hong" },
  { icon: <IoIosAddCircleOutline />, title: "채널 탐색" },
];
const asidellist = [
  { icon: <HiFire />, title: "인기 급상승" },
  { icon: <RiShoppingBag2Fill />, title: "쇼핑" },
  { icon: <PiMusicNoteThin />, title: "음악" },
  { icon: <BiMovie />, title: "영화" },
  { icon: <FiRadio />, title: "실시간" },
  { icon: <SiYoutubegaming />, title: "게임" },
  { icon: <BsTrophy />, title: "스포츠" },
  { icon: <BsLightbulb />, title: "학습" },
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
      <div className="flex flex-row">
        <div className="flex-col grid gap-y-2  p-1">
          {asideflist.map((item) => (
            <div className=" text-white w-[200px] h-[40px] flex flex-row gap-2 p-1 ">
              {item.icon}
              {item.title}
            </div>
          ))}
          <div className="flex flex-row text-white w-[200px] h-[40px] border-t-2 border-white py-1">
            나 <FiChevronRight />
          </div>
          {asidemlist.map((item) => (
            <div className=" text-white w-[200px] h-[40px] flex flex-row gap-2 p-1 ">
              {item.icon}
              {item.title}
            </div>
          ))}
          <div className="flex flex-row text-white w-[200px] h-[40px] border-t-2 border-white py-1">
            구독
          </div>
          {asidem2list.map((item) => (
            <div className=" text-white w-[200px] h-[40px] flex flex-row gap-2 p-1 ">
              {item.icon}
              {item.title}
            </div>
          ))}
          <div className="flex flex-row text-white w-[200px] h-[40px] border-t-2 border-white py-1">
            탐색
          </div>
          {asidellist.map((item) => (
            <div className=" text-white w-[200px] h-[40px] flex flex-row gap-2 p-1 ">
              {item.icon}
              {item.title}
            </div>
          ))}
        </div>

        <div className="gap-5 p-1 text-sm w-full ">
          <div className="flex flex-row p-3 gap-3 bg-black ">
            {list.map((item) => (
              <div className="h-[40px] items-center p-2 px-3  text-white rounded-md bg-zinc-800 active:bg-white active:text-black">
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-row gap-5 p-3">
            <div className="grid gap-y-2 ">
              <div className="flex flex-col w-[300px] h-[200px] bg-zinc-800 rounded-md"></div>
              <div className="flex flex-row w-[300px] h-[100px]">
                <div className="w-[50px] h-[90px]">
                  <div className="rounded-full w-11 h-11 bg-zinc-800"></div>
                </div>
                <div className="py-1 w-[250px] h-[100px] text-white">
                  <div>
                    오롯이 혼자인 방 안에서, 그리고 재즈ㅣWork and Study Jazz
                  </div>
                  <div className="text-zinc-500 text-sm">
                    WRG 우리가 듣고 싶어서 연주한 playlist
                  </div>
                  <div className="text-zinc-500 text-sm">
                    조회수 289만회 6개월전
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[300px] h-[200px] bg-zinc-800 rounded-md"></div>
              <div className="flex flex-row w-[300px] h-[100px]">
                <div className="w-[50px] h-[90px]">
                  <div className="rounded-full w-11 h-11 bg-zinc-800"></div>
                </div>
                <div className="py-1 w-[250px] h-[100px] text-white">
                  <div>Daft punk-Touch(Official Audio) ft.Paul Williams</div>
                  <div className="text-zinc-500 text-sm">Daft punk</div>
                  <div className="text-zinc-500 text-sm">
                    조회수 5093만회 3년전
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-y-2">
              <div className="flex flex-col w-[300px] h-[200px] bg-zinc-800 rounded-md"></div>
              <div className="flex flex-row w-[300px] h-[100px]">
                <div className="w-[50px] h-[90px]">
                  <div className="rounded-full w-11 h-11 bg-zinc-800"></div>
                </div>
                <div className="py-1 w-[250px] h-[100px] text-white">
                  <div>랄로 AI - 시대를 초월한 마음</div>
                  <div className="text-zinc-500 text-sm">못생긴년이담배</div>
                  <div className="text-zinc-500 text-sm">
                    조회수 5.1만회 3개월전
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[300px] h-[200px] bg-zinc-800 rounded-md"></div>
              <div className="flex flex-row w-[300px] h-[100px]">
                <div className="w-[50px] h-[90px]">
                  <div className="rounded-full w-11 h-11 bg-zinc-800"></div>
                </div>
                <div className="py-1 w-[250px] h-[100px] text-white">
                  <div>베이스 매력 모르는 사람 불쌍해</div>
                  <div className="text-zinc-500 text-sm">때잉</div>
                  <div className="text-zinc-500 text-sm">
                    조회수 683만회 1년전
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-y-2">
              <div className="flex flex-col w-[300px] h-[200px] bg-zinc-800 rounded-md"></div>
              <div className="flex flex-row w-[300px] h-[100px]">
                <div className="w-[50px] h-[90px]">
                  <div className="rounded-full w-11 h-11 bg-zinc-800"></div>
                </div>
                <div className="py-1 w-[250px] h-[100px] text-white">
                  <div>
                    위켄드를 모르는 사람이 있어요? 중독성 강한 위켄드의 띵곡
                    모음
                  </div>
                  <div className="text-zinc-500 text-sm">
                    떼껄룩 TAKE A LOOK
                  </div>
                  <div className="text-zinc-500 text-sm">
                    조회수 273만회 6개월전
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[300px] h-[200px] bg-zinc-800 rounded-md"></div>
              <div className="flex flex-row w-[300px] h-[100px]">
                <div className="w-[50px] h-[90px]">
                  <div className="rounded-full w-11 h-11 bg-zinc-800"></div>
                </div>
                <div className="py-1 w-[250px] h-[100px] text-white">
                  <div>알 - 단편 소설</div>
                  <div className="text-zinc-500 text-sm">
                    한눈에 보는 세상 - Kurzgesagt
                  </div>
                  <div className="text-zinc-500 text-sm">
                    조회수 21만회 4개월전
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-y-2">
              <div className="flex flex-col w-[300px] h-[200px] bg-zinc-800 rounded-md"></div>
              <div className="flex flex-row w-[300px] h-[100px]">
                <div className="w-[50px] h-[90px]">
                  <div className="rounded-full w-11 h-11 bg-zinc-800"></div>
                </div>
                <div className="py-1 w-[250px] h-[100px] text-white">
                  <div>
                    David Gilmour - Comfortably Numb Live in Pompeii 2016
                  </div>
                  <div className="text-zinc-500 text-sm">David Gilmour</div>
                  <div className="text-zinc-500 text-sm">
                    조회수 1.6억회 5년전
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[300px] h-[200px] bg-zinc-800 rounded-md"></div>
              <div className="flex flex-row w-[300px] h-[100px]">
                <div className="w-[50px] h-[90px]">
                  <div className="rounded-full w-11 h-11 bg-zinc-800"></div>
                </div>
                <div className="py-1 w-[250px] h-[100px] text-white">
                  <div>
                    남탓을 할 수도 있다. 우리는 남이니까 사고하지 않기, 유연한
                    남탓
                  </div>
                  <div className="text-zinc-500 text-sm">랄로</div>
                  <div className="text-zinc-500 text-sm">
                    조회수 247만회 3년전
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 여기서 질문. 아이콘 색상바꾸고 싶음. bg를 red로 */}
          <div className="flex items-center h-[50px] p-2 gap-2 bg-white text-black">
            <div className="flex-none w-14">
              <SiYoutubeshorts size={30} />
            </div>
            <div className="flex-none w-14">shorts</div>
            <div className="grow"> </div>
            <div className="flex-none w-14">
              <div>
                <GrClose />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 gap-y-2">
            <div className="flex flex-row gap-3">
              <div className="grid gap-y-3">
                <div className="w-[220px] h-[400px] bg-zinc-800 rounded-md "></div>
                <div className="w-[220px] h-[100px] text-white text-base ">
                  <div>아빠만 따르는 시베리안 허스키</div>
                  <div className="text-zinc-500 text-sm">조회수 47만회</div>
                </div>
              </div>
              <div className="grid gap-y-3">
                <div className="w-[220px] h-[400px] bg-zinc-800 rounded-md "></div>
                <div className="w-[220px] h-[100px] text-white text-base ">
                  <div>치즈버거 50개 주문한 이유</div>
                  <div className="text-zinc-500 text-sm">조회수 248만회</div>
                </div>
              </div>
              <div className="grid gap-y-3">
                <div className="w-[220px] h-[400px] bg-zinc-800 ropunded-md "></div>
                <div className="w-[220px] h-[100px] text-white text-base ">
                  <div>서러운 아기 해달</div>
                  <div className="text-zinc-500 text-sm">서러운 아기 해달</div>
                </div>
              </div>
              <div className="grid gap-y-3">
                <div className="w-[220px] h-[400px] bg-zinc-800 ropunded-md "></div>
                <div className="w-[220px] h-[100px] text-white text-base ">
                  <div>서러운 아기 해달</div>
                  <div className="text-zinc-500 text-sm"> 조회수 23만회</div>
                </div>
              </div>
              <div className="grid gap-y-3">
                <div className="w-[220px] h-[400px] bg-zinc-800 ropunded-md "></div>
                <div className="w-[220px] h-[100px] text-white text-base ">
                  <div>서러운 아기 해달</div>
                  <div className="text-zinc-500 text-sm"> 조회수 23만회</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
