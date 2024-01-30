// YearView.tsx

import React from 'react';
import SmallCalendar from './SmallCalendar';
import DayHeader from './DayHeader';

type Props = {
  selectedYear: number;
  targetCalendarDates: Date[];
};

const YearView: React.FC<Props> = ({ selectedYear, targetCalendarDates }) => {
  // 1월부터 12월까지의 월 배열
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <div className="grid grid-cols-4 w-full  justify-center items-start gap-4 ">
      {months.map((month) => {
        return (
          <div className='bg-slate-50 rounded-xl  '>
          <div key={month}>
            <h2 className="text-xl font-semibold flex  justify-center items-center h-[60px] text-lime-800">{`${month}월`}</h2>
            <DayHeader className='w-full grid grid-cols-7 text-[13px] items-center font-bold  bg-lime-300   ' form='short'/>
            <SmallCalendar
              selectedMonth={month}
              selectedYear={selectedYear}
              today={new Date()} // 각 월에 따른 today 전달
            />
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default YearView;
