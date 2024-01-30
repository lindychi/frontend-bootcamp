import React from 'react'
import DayView from '../components/DayView'

type Props = {}

export default function WeekPage({}: Props) {
  const today = new Date();
  const hours = Array.from({ length: 24 }, (_, index) => index);
  const startOfWeek = new Date(today);
const dayOfWeek = today.getDay();
const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
startOfWeek.setDate(diff);


const weekDates = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(startOfWeek);
  date.setDate(startOfWeek.getDate() + index);
  return date;
});

  return (
    <div className='flex flex-row w-full h-[calc(100vh)] '>
          
    <div className='py-2'>
      {hours.map((hour) => (
      <div key={hour} className="flex flex-col py-5 h-[60px] w-12 text-lime-500">
    {hour > 9 ? hour : `0${hour}`}:00
    </div>
     ))}
   </div>
 <div className='grid grid-cols-7 w-[calc(100vw-300px)]'>
    
    {weekDates.map((day,index) => (
    <div>
      <div className='flex justify-center font-bold items-center h-10  border-white border-[1px] bg-lime-500 text-white'>
        {(day.getDate() > 9 ? day.getDate() : `0${day.getDate()}`)}</div>
      <div className=''>
  <DayView key={index} selectedDate={day}/>
  </div></div>))}
  </div>

  </div>
  )
}