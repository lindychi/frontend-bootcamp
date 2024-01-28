import { RouteObject } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import MonthCalendar from "./components/MonthCalendar";
import MonthPage from "./pages/MonthPage";
import WeekPage from "./pages/WeekPage";
import DayPage from "./pages/DayPage";
import YearPage from "./pages/YearPage";

export const routes: RouteObject[] = [
  {
    path: "",
    element: <Calendar />,
    children: [
      { index: true, element: <MonthPage /> },
      { path: "month", element: <MonthPage /> },
      { path: "week", element: <WeekPage /> },
      { path: "day", element: <DayPage /> },
      { path: "year", element: <YearPage /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    // 미지정 경로 에러 처리
    path: "*",
    element: <div>404</div>,
  },
];

// import { RouteObject } from "react-router-dom";
// import CalendarRightLayout from "./components/Layout/CalendarRight";
// import MonthPage from "./pages/MonthPage";
// import WeekPage from "./pages/WeekPage";
// import DayPage from "./pages/DayPage";
// import YearPage from "./pages/YearPage";

// export const routes: RouteObject[] = [
//   {
//     path: "",
//     element: <CalendarRightLayout />,
//     children: [
//       {
//         index: true,
//         element: <MonthPage />,
//       },
//       {
//         path: "week",
//         element: <WeekPage />,
//       },
//       {
//         path: "day",
//         element: <DayPage />,
//       },
//       {
//         path: "month",
//         element: <MonthPage />,
//       },
//       {
//         path: "year",
//         element: <YearPage />,
//       },
//     ],
//   },
// ];
