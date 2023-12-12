import React from 'react'
import { getMonthString } from '../libs/calendar'

type Props = { selectedMonth : number }



export default function MonthHeader({selectedMonth }: Props) {
  return (
    <div className="items-center px-[6px] text-xl grid justify-start">
            {getMonthString(selectedMonth)}
          </div>
  )
}