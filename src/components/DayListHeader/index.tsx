import React from "react";
import { dayList } from "../../consts/calendar";

type Props = {};

export default function DayListHeader({}: Props) {
  return (
    <div className="self-stretch border-b border-gray-300 justify-start items-start inline-flex">
      {dayList.map((dayName) => (
        <div className="grow shrink basis-0 h-6 px-2.5 justify-center items-center gap-2.5 flex">
          <div className="justify-start items-start gap-2.5 flex">
            <div className="text-zinc-800 text-xs font-medium">
              {dayName.medium}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
