import React from "react";
import { DateName, dayList } from "../consts/calendar";

type Props = {
  dayList: DateName[];
};

export default function SevenDays({ dayList }: Props) {
  return (
    <div className="mediumDay w-full flex text-center">
      {dayList.map(({ medium }, index) => (
        <div key={index} className="day w-full px-16 py-2  text-xs">
          {medium}
        </div>


      ))}
    </div>
  );
}
