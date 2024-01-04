import { RouteObject } from "react-router-dom";
import CalendarRightLayout from "./components/Layout/CalendarRight";
import MonthPage from "./pages/MonthPage";
import WeekPage from "./pages/WeekPage";
import DayPage from "./pages/DayPage";
import YearPage from "./pages/YearPage";

export const routes: RouteObject[] = [
  {
    path: "",
    element: <CalendarRightLayout />,
    children: [
      {
        index: true,
        element: <MonthPage />,
      },
      {
        path: "week",
        element: <WeekPage />,
      },
      {
        path: "day",
        element: <DayPage />,
      },
      {
        path: "month",
        element: <MonthPage />,
      },
      {
        path: "year",
        element: <YearPage />,
      },
    ],
  },
];
