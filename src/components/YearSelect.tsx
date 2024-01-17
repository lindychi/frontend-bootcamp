import React from 'react'

type Props = {
    selectedYear : number ,
    handleYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
} ;


export default function YearSelect({selectedYear, handleYearChange }: Props) {
    const today = new Date(); 
  return (
    <select
                className="text-lime-500 border-lime-500 border-solid border-[1px] p-2 gap-1 rounded"
                onChange={handleYearChange}
                value={selectedYear}
              >
                {Array.from({ length: 10 }, (_, index) => today.getFullYear() - 5 + index).map(
                  (yearValue) => (
                    <option key={yearValue} value={yearValue}>
                      {yearValue}
                    </option>
                  )
                )}
              </select>
  )
}