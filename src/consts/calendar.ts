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

export const calendarTypeList = [
  { key: "month", value: "Month" },
  { key: "week", value: "Week" },
  { key: "day", value: "Day" },
  { key: "year", value: "Year" },
];
