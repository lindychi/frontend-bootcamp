import React from 'react'
import DayView from '../components/DayView';
import { EventItem } from '../types/common';

type Props = {}

export default function DayPage({}: Props) {
  const today = new Date();
  const hours = Array.from({ length: 24 }, (_, index) => index);

  const [isOpen, setIsOpen] = React.useState(false);
    const [left, setLeft] = React.useState(0);
    const [top, setTop] = React.useState(0);
    const [event, setEvent] =React.useState<EventItem>();

  const handleClickEvent = (
    e: React.MouseEvent<HTMLDivElement>,
   data : EventItem
   ) =>
  {
    
    const position = (e.target as any).getBoundingClientRect()
    setIsOpen(true);
    setLeft(position.left );
    setTop(position.top);
    setEvent(data)
    
  }

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
            onClickEvent={handleClickEvent}
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
       {isOpen && 
       (<div className='fixed w-fit bg-red-300' style={{ left, top }}
     > 
       제목 : {event?.title} </div>)}
      </div>
  )
}