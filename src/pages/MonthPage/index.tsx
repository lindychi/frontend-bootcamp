import React from "react";

import MonthCalendar from "../../components/MonthCalendar";

type Props = {};

export default function MonthPage({}: Props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <MonthCalendar
      year={selectedDate.getFullYear()}
      month={selectedDate.getMonth()}
    />
  );
}
