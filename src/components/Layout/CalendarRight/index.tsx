import React from "react";
import clsx from "clsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { calendarTypeList } from "../../../consts/calendar";

import { getMonthString } from "../../../libs/calendar";

import SelectBox from "../../SelectBox";
import AddEvent from "../../AddEvent";

import Search from "../../../icons/Search";
import Plus from "../../../icons/Plus";
import Hamburger from "../../../icons/Hamburger";

type Props = {};

export default function CalendarRightLayout({}: Props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const calendarType = location.pathname.split("/")[1] ?? "month";

  return (
    <div
      className={clsx([
        "grow shrink basis-0 min-h-screen flex-col justify-start items-center inline-flex",
        {
          "h-screen": calendarType === "month",
          "h-fit": calendarType === "year",
        },
      ])}
    >
      <div className="self-stretch p-4 bg-white border-b border-gray-300 border-opacity-60 justify-between items-center inline-flex">
        <div className="justify-start items-center gap-4 flex">
          <div className="justify-start items-start flex">
            <Hamburger />
          </div>
          <div className="justify-start items-start gap-2.5 flex">
            <div className="flex gap-1 items-center">
              {calendarType !== "year" && (
                <span className="text-zinc-800 text-3xl font-medium">
                  {getMonthString(selectedDate.getMonth() + 1)}
                </span>
              )}
              <span className="text-zinc-800 text-3xl font-normal">
                {selectedDate.getFullYear()}
              </span>
            </div>
          </div>
          <SelectBox
            options={calendarTypeList}
            selectedOption={
              calendarTypeList.find((type) => type.key === calendarType) ??
              calendarTypeList[0]
            }
            onClick={(select) => {
              navigate(`/${select.key}`);
            }}
          />
        </div>
        <div className="justify-start items-center gap-4 flex">
          <Search />

          <div
            className="w-[98px] p-2 bg-primary rounded-[3px] justify-center items-center gap-1 flex relative"
            onClick={() => setIsAddEventOpen(true)}
          >
            <div className="justify-start items-start gap-2.5 flex">
              <div className="text-white text-xs font-medium">Add event</div>
            </div>
            <Plus />

            {isAddEventOpen && (
              <div className="absolute -top-1 -right-1 bg-white rounded-xl p-4 shadow-2xl z-10">
                <AddEvent onClose={() => setIsAddEventOpen(false)} />
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-2xl !fill-black">
                  <Plus />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
