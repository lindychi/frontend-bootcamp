import React from "react";

import WeekCalendar from "../../components/WeekCalendar";

type Props = {};

export default function WeekPage({}: Props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <WeekCalendar
      year={selectedDate.getFullYear()}
      month={selectedDate.getMonth()}
      day={selectedDate.getDate()}
    />
  );
}
