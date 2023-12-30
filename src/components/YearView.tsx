// YearView.tsx

import React from 'react';
import SmallCalendar from './SmallCalendar';

type Props = {
  selectedYear: number;
  targetCalendarDates: Date[];
};

const YearView: React.FC<Props> = ({ selectedYear, targetCalendarDates }) => {
  // 1월부터 12월까지의 월 배열
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap gap-4">
      {months.map((month) => {
        return (
          <div key={month}>
            <h2 className="text-lg font-semibold mb-2">{`${month}월`}</h2>
            <SmallCalendar
              dates={targetCalendarDates}
              selectedMonth={month}
              selectedYear={selectedYear}
              today={new Date()} // 각 월에 따른 today 전달
            />
          </div>
        );
      })}
    </div>
  );
};

export default YearView;
