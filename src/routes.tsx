import { RouteObject } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import WeekView from "./components/WeekView";
import DayView from "./components/DayView";
import YearView from "./components/YearView";

import { useState } from "react";
import BigCalendar from "./components/BigCalendar";

export const routes: RouteObject[] = [
  {
    path: "",
    element: <Calendar />,
    children: [
      { index: true, element: <WeekView /> },
      { path: "month", element: <BigCalendar /> },
      { path: "week", element: <WeekView /> },
      { path: "day", element: <DayView /> },
      { path: "year", element: <YearView /> },
    ],
  },
  {
    path: "Login",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
];
