import CalendarPart from "./CalendarPart";
import { useState } from "react";

function MainPage() {
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() as number);
  const [year, setYear] = useState(currentDate.getFullYear() as number);
  const [day, setDay] = useState(currentDate.getDate() as number);

  const handleChangeDay = (dayChanged: number) => {
    setDay(dayChanged);
  };

  const handleChangeMonth = (monthChanged: number, yearChanged: number) => {
    setMonth(monthChanged);
    setDay(yearChanged);
  };

  return (
    <>
      <button
        className="btn btn-danger"
        onClick={() => {
          const deleteCookie = (name: string) => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
          };

          deleteCookie("usernameForPapierowyRPG");
        }}
      >
        Log out
      </button>
      <CalendarPart
        onChangeDay={handleChangeDay}
        onChangeMonth={handleChangeMonth}
        currDay={day}
        currMonth={month}
        currYear={year}
      />
    </>
  );
}

export default MainPage;
