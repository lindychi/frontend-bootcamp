import React from "react";

type YearDropdownProps = {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
};

const YearDropDown: React.FC<YearDropdownProps> = ({
  selectedYear,
  setSelectedYear,
}) => {
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
  };

  const years = Array.from({ length: 6 }, (_, index) => 2020 + index);

  return (
    <div>
      <button className="flex text-primary border border-primary rounded-md p-2 gap-1">
        <select
          className="text-primary"
          onChange={handleYearChange}
          value={selectedYear}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </button>
    </div>
  );
};

export default YearDropDown;
