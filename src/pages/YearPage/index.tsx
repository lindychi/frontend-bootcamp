import React from "react";

import YearCalendar from "../../components/YearCalendar";

type Props = {};

export default function YearPage({}: Props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return <YearCalendar year={selectedDate.getFullYear()} />;
}
