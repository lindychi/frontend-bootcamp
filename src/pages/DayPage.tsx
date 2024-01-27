import React from 'react'
import DayView from '../components/DayView';

type Props = {}

export default function DayPage({}: Props) {
  const today = new Date();
  const hours = Array.from({ length: 24 }, (_, index) => index);

  return (
    <div className='flex flex-row outer-box '>
            <div>
              {hours.map((hour) => (
              <div key={hour} className="flex flex-col  h-[60px]">
            {hour > 9 ? hour : `0${hour}`}:00
            </div>
             ))}
           </div>
           <div className='w-[1640px] py-2 relative'>
          <DayView
            selectedDate={today}
          />
          <hr
        style={{
         border: 'none',
         borderTop: '2px solid red', 
        margin: 0,
        padding: 0, 
         width: '100%', 
        position: 'absolute', 
         top: `${(today.getHours() * 60) + today.getMinutes()}px`,
         }}
        />
       </div>
      </div>
  )
}