import React from 'react'

type Props = {}

export default function DayCal({}: Props) {
  return (
    <div>
    {Array(24).fill(0).map((_, index) => (
      <div key={index}>
        <div className="dayCal-Container  relative flex w-full">
          <div className="timeBox w-[80px] border-r border-dashed "></div>
          <div className="time absolute top-[70px] text-xs px-6"> {index === 23 ? '' : ('00' + ((index + 1) % 24)).slice(-2) + ':00'}</div>
          <div className="weekBox w-full min-h-[80px] p-5 border-b border-dashed text-start"></div>
        </div>
      </div>
    ))}
  </div>
);
}



//     <div>
//       <div className="dayCal-Container relative flex w-full">
//         <div className="timeBox  w-[80px] border-r bg-red-300">
//         </div>
//         <div className="time absolute top-[70px] text-xs px-6">0000</div>
        
//         <div className="weekBox w-full min-h-[80px] p-5 border-b text-start bg-red-500"></div>
//         </div>
//     </div>
//   );
// }













