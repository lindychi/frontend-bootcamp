import React from 'react'

type Props = {}

export default function 
({}: Props) {

  return (
    <div>
      {/* 일력 */}
      {Array.from({ length: 24 }, (_, index) => (
          <div key={index} className="dayCal-Container flex">
            <div className="timeBox flex-col w-[80px] text-s px-5 border-r bg-red-200 text-xs">
              0000
            </div>
            <div className="weekBox w-full min-h-[80px] p-5 border-b text-start">
              Lorem ipsum dolor sit met consectetur
            </div>
          </div>
        ))}    
    </div>
  )
}