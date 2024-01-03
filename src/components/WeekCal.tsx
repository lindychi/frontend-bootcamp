import React from 'react'
import SevenDays from './SevenDays'
import { dayList } from '../consts/calendar';



type Props = {}


export default function WeekCal({}: Props) {

return (
  
  
<div>
  {/* 주력 */}
  {/* bg-red-400 */}
  <div className='flex'>
    <div className="w-[64px]"></div>
    <div className="flex w-[1150px] bg-red-500"><SevenDays dayList={dayList} /></div>
  </div>
  <div className="flex w-100% text-center ">
    <div className="timeBox w-[64px] border-l text-s bg-yellow-300 text-xs px-5 ">0000</div>
    <div className="weekBox flex w-full h-[80px] border-b text-start">
      {dayList.map((day, index) => (
        <div
          key={index}
          className={`${day} w-full border-r ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
        ></div>
      ))}
    </div>
    {/* <div className="weekBox flex w-full h-[80px] border-b text-start">
      <div className="s w-full border-r  bg-gray-100"></div>
      <div className="m w-full border-r"></div>
      <div className="t w-full border-r"></div>
      <div className="w w-full border-r"></div>
      <div className="th w-full border-r"></div>
      <div className="s w-full border-r"></div>
      <div className="st w-full border-r bg-gray-100"></div>
    </div> */}
  </div>
</div>
)
}