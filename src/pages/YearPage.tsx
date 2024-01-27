import React, {  useState } from 'react';
import YearView from '../components/YearView';
import { getCalendarDates } from '../libs/calendar';

type Props = {}

export default function YearPage({}: Props) {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const targetCalendarDates: Date[] = getCalendarDates(selectedYear, selectedMonth);

  return (
    <div className='grid w-full py-2'>
    <YearView
    selectedYear={selectedYear}
    targetCalendarDates={targetCalendarDates}
    />
 </div> 
  )
}