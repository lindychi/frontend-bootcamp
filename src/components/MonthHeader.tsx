import React from 'react'
import { getMonthString } from '../libs/calendar'

type Props = { selectedMonth : number }



export default function MonthHeader({selectedMonth }: Props) {
  return (
    <div className="h-[47px] items-center px-[6px] py-2.5 text-xl grid ">
            {getMonthString(selectedMonth)}
          </div>
  )
}