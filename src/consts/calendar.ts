export type DateName = {
  short: string;
  medium: string;
};

export const dayList: DateName[] = [
  { short: "s", medium: "Sun" },
  { short: "m", medium: "Mon" },
  { short: "t", medium: "Tue" },
  { short: "w", medium: "Wed" },
  { short: "t", medium: "Thur" },
  { short: "f", medium: "Fri" },
  { short: "s", medium: "Sat" },
];

// 선택된 월에 따라 해당하는 월 이름을 반환하는 함수
export const getMonthString = (selectedMonth: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[selectedMonth - 1] || "";
};
