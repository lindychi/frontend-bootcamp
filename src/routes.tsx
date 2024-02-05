import { RouteObject } from 'react-router-dom';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import MonthCal from './components/MonthCal';
import WeekCal from './components/WeekCal';
import DayCal from './components/DayCal';
import YearCal from './components/YearCal';
import { EventItem } from './types/common';

type Props = {
  event?: EventItem;
};

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Calendar />,
    children: [
      { index: true, element: <MonthCal /> },
      { path: 'month', element: <MonthCal /> },
      { path: 'day', element: <DayCal /> },
      { path: 'week', element: <WeekCal /> },
      { path: 'year', element: <YearCal /> },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
];
