import React from 'react';
import { dayList } from '../consts/calendar';

type Props = {
  className: string;
  form: 'short' | 'medium';
};

export default function DayHeader({ className, form }: Props) {
  return (
    <div className={className}>
      {dayList.map((day, index) => (
        <div className="w-[23px] h-[25px] grid items-center justify-center" key={index}>
          {day[form]}
        </div>
      ))}
    </div>
  );
}