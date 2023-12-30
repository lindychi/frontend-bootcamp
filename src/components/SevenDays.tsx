import React from "react";
import { DateName, dayList } from "../consts/calendar";

type Props = {
  dayList: DateName[];
};

export default function SevenDays({ dayList }: Props) {
  return (
    <div className="mediumDay flex text-center">
      {dayList.map(({ medium }, index) => (
        <div key={index} className="day w-full px-16 border-r text-s">
          {medium}
        </div>


      ))}
    </div>
  );
}
