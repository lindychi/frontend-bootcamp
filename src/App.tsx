import React, { useState, useEffect } from "react";
import clsx from "clsx";
import "./App.css";
import { dayList } from "./consts/calendar";
import { getCalendarDates, getMonthString } from "./libs/calendar";
import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";
import DropDown from "./components/Dropdown";
import CalendarSection from "./components/CalendarSection";
import BigCalendar from "./components/BigCalendar";
import "./Modal.css";
import YearView from "./components/YearView";
import WeekView from "./components/WeekView";
import WeeklyView from "./components/WeeklyView";
import DayView from "./components/DayView";
import MonthView from "./components/MonthView";
import EventModal from "./components/AddEvent";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { supabase } from "./libs/supabase";
import { routes } from "./routes";

enum View {
  Month = "month",
  Year = "year",
  Week = "week",
  Day = "Day",
}
function App() {
  const router = useRoutes(routes);

  return <>{router}</>;
}
// function App() {
// const [selectedMonth, setSelectedMonth] = useState<number>(1);
// const [selectedYear, setSelectedYear] = useState<number>(
//   new Date().getFullYear()
// );
// const [targetCalendarDates, setTargetCalendarDates] = useState<Date[] | null>(
//   null
// );
// const [currentView, setCurrentView] = useState<View>(View.Month);

// const handleViewChange = (view: View) => {
//   setCurrentView(view);
// };

// useEffect(() => {
//   setTargetCalendarDates(null);
//   const newDates: Date[] = getCalendarDates(selectedYear, selectedMonth);
//   setTargetCalendarDates(newDates);
// }, [selectedMonth, selectedYear]);

// const today = new Date();
// const getDateClass = (date: Date): string => {
//   if (date.getMonth() + 1 !== selectedMonth) {
//     return "text-gray-400";
//   }
//   if (
//     date.getDate() === today.getDate() &&
//     date.getMonth() === today.getMonth() &&
//     date.getFullYear() === today.getFullYear()
//   ) {
//     return "bg-primary rounded-full text-white";
//   }
//   if (date.getDay() === 6 || date.getDay() === 0) {
//     return "text-red-500";
//   }
//   return "";
// };

// const [isModalOpen, setIsModalOpen] = useState(false);

// const openModal = () => {
//   setIsModalOpen(true);
// };

// const closeModal = () => {
//   setIsModalOpen(false);

//   };
//   const handleEventAdded = () => {
//     // 이벤트가 추가된 후에 수행할 작업을 정의합니다.
//     // 예: 이벤트 목록을 다시 불러오기
//   };

//   const [selectedView, setselectedView] = useState("month");
//   const [isAddEventOpen, setIsAddEventOpen] = useState(false);
//   const handleSaveEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setselectedView(e.target.value);
//   };

//   // 작은달력에 넣었던 효과가 큰달력에 적용되지 않아서 한번 더  추가함
//   const getSecondDateClass = (date: Date): string => {
//     if (date.getMonth() + 1 !== selectedMonth) {
//       return "text-gray-400 bg-zinc-100";
//     }
//     if (date.getDay() === 6 || date.getDay() === 0) {
//       return "text-red-500";
//     }
//     return "";
//   };
// const getTodayDayOfWeek = (): string => {
//   const daysOfWeek = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const today = new Date().getDay();
//   return daysOfWeek[today];
// };
//   const navigate = useNavigate();

//   const handleGoogleLogin = async () => {
//     let { data, error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//     });
//   };

//   return (
//     <div className="flex flex-row h-screen">
// <CalendarSection
//   selectedMonth={selectedMonth}
//   targetCalendarDates={targetCalendarDates}
//   getDateClass={getDateClass}

// />

//       <div className="w-full h-full">
// <div className="w-full h-[90px] flex flex-row justify-between p-3 items-center border border-state-300 rounded-tr-lg">
//   <div className="flex justify-start gap-5 ">
//     <Hamburger />
//     <div className="text-4xl">
//       {currentView === View.Month
//         ? `${getMonthString(selectedMonth)} ${selectedYear}`
//         : currentView === View.Year
//         ? `${selectedYear}`
//         : currentView === View.Week
//         ? `${getMonthString(selectedMonth)} ${selectedYear}`
//         : currentView === View.Day
//         ? `${getTodayDayOfWeek()} `
//         : ""}
//     </div>

//     <DropDown
//       selectedMonth={selectedMonth}
//       setSelectedMonth={setSelectedMonth}
//     />
//     <div className="flex text-primary border border-primary rounded-md p-2 ">
//       <select
//         className={"text-primary"}

//         onChange={(e) => navigate("" + e.target.value)}
//       >
//         <option value={"Day"}>Day</option>
//         <option value={"Week"}>Week</option>
//         <option value={"Month"}>Month</option>
//         <option value={"Year"}>Year</option>
//       </select>
//     </div>
//   </div>
//   {/* onchange가 호출되는지 찾아봤어야 함. console.log(e )  day를 눌렀을때 주소바뀌는애가 호출이 안됐었음 호출이 안되서 주소가 안바뀌고 데이가 작동을 안했음  */}
//   <div className="flex gap-3">
//     <Search />

//     <div>
//       <button
//         onClick={openModal}
//         className="bg-blue-500 text-white hover:brightness-75 items-center p-2 flex flex-row gap-1"
//       >
//         Add Event <Plus />
//       </button>

//       {isModalOpen && (
//         <EventModal
//           onClose={closeModal}
//           onEventAdded={handleEventAdded}
//         />
//       )}

//     </div>
//   </div>
// </div>

//         <Routes>
//           <Route
//             path="/month"
//             element={
//               <MonthView
//                 targetCalendarDates={targetCalendarDates}
//                 getSecondDateClass={getSecondDateClass}
//               />
//             }
//           />
//           {""}
//           <Route path="/week" element={<WeekView />} />
//           {""}
//           <Route path="/day" element={<DayView />} />
//           {""}
//           <Route
//             path="/year"
//             element={
//               <YearView
//                 year={selectedYear}
//                 getDateClass={getDateClass}
//                 dayList={dayList}
//               />
//             }
//           />
//           {""}

//         </Routes>
//       </div>

//     </div>
//   );
// }

export default App;
