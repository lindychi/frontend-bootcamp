import { RouteObject } from "react-router-dom";
import CalendarRightLayout from "./components/Layout/CalendarRight";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <CalendarRightLayout calendarType="month" />,
  },
  {
    path: "/week",
    element: <CalendarRightLayout calendarType="week" />,
  },
  {
    path: "/day",
    element: <CalendarRightLayout calendarType="day" />,
  },
  {
    path: "/month",
    element: <CalendarRightLayout calendarType="month" />,
  },
  {
    path: "/year",
    element: <CalendarRightLayout calendarType="year" />,
  },
];
