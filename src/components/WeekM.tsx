import React from 'react'

type Props = {}

export default function WeekM({}: Props) {
return (
<div>
  {/* 주력 */}
  <div className="flex w-100% bg-red-400">
    <div className="timeBox w-[64px] border-l text-s bg-yellow-300"></div>
    <div className="weekBox flex w-full h-[80px] bg-red-600 text-start">
      <div className="w-full border-r break-words"></div>
      <div className="w-full border-r"></div>
      <div className="w-full border-r"></div>
      <div className="w-full border-r"></div>
      <div className="w-full border-r"></div>
      <div className="w-full border-r"></div>
      <div className="w-full border-r"></div>
    </div>
  </div>
</div>
)
}