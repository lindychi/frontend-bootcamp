import React from 'react'
import { getMonthString } from '../libs/calendar'

type Props = {
    selectedMonth: number
    handleMonthChange : (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function MonthSelect({selectedMonth, handleMonthChange}: Props) {
  return (
    <select
                className="text-lime-500 border-lime-500  border-solid border-[1px] p-2 gap-1 rounded"
                onChange={handleMonthChange}
                value={selectedMonth}
              >
                {Array.from({ length: 12 }, (_, index) => index + 1).map((monthValue) => (
                  <option key={monthValue} value={monthValue}>
                    {getMonthString(monthValue)}
                  </option>
                ))}
              </select>
  )
}