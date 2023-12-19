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
        <div className="w-[26px] h-[25px]" key={index}>
          {day[form]}
        </div>
      ))}
    </div>
  );
}