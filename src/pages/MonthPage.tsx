import React, {  useState } from 'react';
import BigCalendar from '../components/BigCalendar'
import { getCalendarDates } from '../libs/calendar';

type Props = {}

export default function MonthPage({}: Props) {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const targetCalendarDates: Date[] = getCalendarDates(selectedYear, selectedMonth);



  return (
    <div className='w-[calc(100vw-250px)] h-screen '>
        <BigCalendar
          dates={targetCalendarDates}   
        />
        </div>
  )
}