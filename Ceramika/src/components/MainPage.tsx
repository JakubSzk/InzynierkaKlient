import CalendarPart from "./CalendarPart";
import DayClicked from "./DayClicked";
import { useState } from "react";

function MainPage() {
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() as number); //from 0
  const [year, setYear] = useState(currentDate.getFullYear() as number);
  const [day, setDay] = useState(currentDate.getDate() as number);
  const [priv, setPriv] = useState(false);

  const handleChangeDay = (dayChanged: number) => {
    setDay(dayChanged);
  };

  const handleChangeMonth = (monthChanged: number, yearChanged: number) => {
    setMonth(monthChanged);
    setYear(yearChanged);
  };

  const handleChangePriv = (privacy: boolean) => {
    setPriv(privacy);
  };
  //console.log(day);
  return (
    <>
      <br></br>
      <CalendarPart
        onChangeDay={handleChangeDay}
        onChangeMonth={handleChangeMonth}
        currDay={day}
        currMonth={month}
        currYear={year}
        currPriv={priv}
        onChangePriv={handleChangePriv}
      />
      <br></br>
      <DayClicked
        currDay={day}
        currMonth={month}
        currYear={year}
        currPrivate={priv}
      />
    </>
  );
}

export default MainPage;
