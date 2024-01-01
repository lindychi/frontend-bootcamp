import React from 'react'



type Props = {}

export default function WeekCalendar({}: Props) {

return (
  
<div>
  {/* 주력 */}
  {/* bg-red-400 */}
  <div className="flex w-100% text-center ">
    <div className="timeBox w-[64px] border-l text-s bg-yellow-300 text-xs ">0000</div>
    <div className="weekBox flex w-full h-[80px] border-b text-start">
      <div className="s w-full border-r  bg-gray-100 break-words"></div>
      <div className="m w-full border-r"></div>
      <div className="t w-full border-r"></div>
      <div className="w w-full border-r"></div>
      <div className="th w-full border-r"></div>
      <div className="s w-full border-r"></div>
      <div className="st w-full border-r bg-gray-100"></div>
    </div>
  </div>
</div>
)
}