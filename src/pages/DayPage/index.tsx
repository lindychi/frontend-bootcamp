import React from "react";
import DayCalendar from "../../components/DayCalendar";

type Props = {};

export default function DayPage({}: Props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <DayCalendar
      year={selectedDate.getFullYear()}
      month={selectedDate.getMonth()}
      day={selectedDate.getDate()}
    />
  );
}
