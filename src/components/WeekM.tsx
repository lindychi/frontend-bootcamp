import React from "react";
import { DateName, dayList } from "../consts/calendar";

type Props = {
  dayList: DateName[];
};

export default function WeekM({ dayList }: Props) {
  return (
    <div className="mediumDay flex items-center justify-between ">
      {dayList.map(({ medium }, index) => (
        <div key={index} className="day px-16 text-s">
          {medium}
        </div>


      ))}
    </div>
  );
}
