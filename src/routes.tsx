import { RouteObject } from "react-router-dom";
import { Login } from "./pages/Login";
import Calendar from "./pages/Calendar";
import YearPage from "./pages/YearPage";
import WeekPage from "./pages/WeekPage";
import DayPage from "./pages/DayPage";
import MonthPage from "./pages/MonthPage";

export const routes : RouteObject[] = [
    {
        path : "",
        element : <Calendar/>,
        children : [
            {index : true, element : <MonthPage/> },
            {path: "month", element: <MonthPage/> },
            {path : "week", element :<WeekPage/> },
            {path : "day", element : <DayPage/> },
            {path : "year", element : <YearPage/>},
       ],
    },
    {
        path : "login",
        element : <Login />
    },
    {
        path : "*",
        element : <div>404</div>
    }
];