import React from "react";
import { getMonthString } from "../libs/calendar";

type DropdownProps = {
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
};

const DropDown: React.FC<DropdownProps> = ({
  selectedMonth,
  setSelectedMonth,
}) => {
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = new Date();
    setSelectedMonth(Number(e.target.value));
    // 년도 변경 로직이 필요하다면 추가
    // setSelectedYear(selectedDate.getFullYear());
  };

  return (
    <div>
      <button className="flex text-primary border border-primary rounded-md p-2 gap-1">
        <select
          className="text-primary"
          onChange={handleMonthChange}
          value={selectedMonth}
        >
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {getMonthString(index + 1)}
            </option>
          ))}
        </select>
      </button>
    </div>
  );
};

export default DropDown;