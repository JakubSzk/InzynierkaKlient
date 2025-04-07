import React, { useState, useEffect } from "react";

interface Props {
  onChangeDay: (day: number) => void;
  onChangeMonth: (month: number, year: number) => void;
  currDay: number;
  currMonth: number;
  currYear: number;
  currPriv: boolean;
  onChangePriv: (privacy: boolean) => void;
}

interface DayCount {
  nr: number;
  count: number;
}

function CalendarPart({
  onChangeDay,
  onChangeMonth,
  currDay,
  currMonth,
  currYear,
  currPriv,
  onChangePriv,
}: Props) {
  const [dataSet, setDataSet] = useState<DayCount[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const cellStyle = {
    maxWidth: "800px",
    minWidth: "700px",
  };

  const backgroundYellow300Style = {
    backgroundColor: "#fff9ed",
  };
  const backgroundGreen200Style = {
    backgroundColor: "#cfe9dc",
  };
  const backgroundRed300Style = {
    backgroundColor: "#f4cccc",
  };
  const backgroundbutton = {
    backgroundColor: "#bf8a5a",
  };
  const backgroundbutton2 = {
    backgroundColor: "#a97449 ",
  };

  const getMonthLength = () => {
    switch (currMonth) {
      case 0 || 2 || 4 || 6 || 7 || 9 || 11:
        return 31;
      case 1:
        return currYear % 4 === 0 ? 29 : 28;
      default:
        return 30;
    }
  };

  const length = getMonthLength();

  useEffect(() => {
    const fetchMonthData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://localhost:7174/api/courses/perMonth?month=${
            currMonth + 1
          }&year=${currYear}&isPrivate=${currPriv ? "true" : "false"}`
        );

        if (!response.ok) {
          throw new Error(`Błąd sieci: ${response.status}`);
        }

        const json = await response.json();
        const newDataSet: DayCount[] = Array.from({ length }, (_, i) => ({
          nr: i + 1,
          count: json[i]?.amountPerIndex || 0,
        }));

        setDataSet(newDataSet);
      } catch (error) {
        console.error("Błąd połączenia z API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonthData();
  }, [currMonth, currYear, currPriv]);

  const monthNames = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  const name = monthNames[currMonth] || "";

  let first = new Date(currYear, currMonth, 1).getDay();
  if (first === 0) first = 7;

  return (
    <div
      className="container justify-content-center border rounded-4"
      style={cellStyle}
    >
      <div
        className="row justify-content-center rounded-4"
        style={backgroundYellow300Style}
      >
        <h2 className="text-center">{`${name} ${currYear}`}</h2>
      </div>

      {isLoading ? (
        <div className="text-center" style={cellStyle}>
          Ładowanie danych...
        </div>
      ) : (
        Array.from({ length: 6 }, (_, rowIndex) => (
          <div key={rowIndex} className="row justify-content-center">
            {Array.from({ length: 7 }, (_, colIndex) => {
              const day = rowIndex * 7 + colIndex + 1 - first;
              return day > 0 && day <= length ? (
                <div
                  key={colIndex}
                  className="col card"
                  style={
                    ((currPriv && 8 - (dataSet[day - 1]?.count ?? 0) > 0) ||
                      (!currPriv && dataSet[day - 1]?.count)) ??
                    0 > 0
                      ? backgroundGreen200Style
                      : backgroundRed300Style
                  }
                  onClick={() =>
                    ((currPriv && 8 - (dataSet[day - 1]?.count ?? 0) > 0) ||
                      (!currPriv && dataSet[day - 1]?.count)) ??
                    0 > 0
                      ? onChangeDay(day)
                      : null
                  }
                >
                  <h5 className="card-title">{day}</h5>
                  <div style={{ paddingBottom: "5%" }}></div>
                  <h6>
                    {currPriv ? "Wolne godziny" : "Kursy Cykliczne"}{" "}
                    {currPriv
                      ? 8 - (dataSet[day - 1]?.count ?? 0)
                      : dataSet[day - 1]?.count ?? 0}
                  </h6>
                </div>
              ) : (
                <div
                  key={colIndex}
                  className="col "
                  style={backgroundYellow300Style}
                ></div>
              );
            })}
          </div>
        ))
      )}

      <div
        className="row justify-content-center rounded-4"
        style={backgroundYellow300Style}
      >
        <button
          className="col-1 btn"
          style={backgroundbutton}
          onClick={() => {
            const newMonth = (currMonth + 11) % 12;
            const newYear = newMonth === 11 ? currYear - 1 : currYear;
            onChangeMonth(newMonth, newYear);
          }}
        >
          {"<"}
        </button>

        <button
          className="col-3 btn"
          style={backgroundbutton2}
          onClick={() => {
            onChangePriv(!currPriv);
          }}
        >
          Zmień kategorię
        </button>

        <button
          className="col-1 btn"
          style={backgroundbutton}
          onClick={() => {
            const newMonth = (currMonth + 1) % 12;
            const newYear = newMonth === 0 ? currYear + 1 : currYear;
            onChangeMonth(newMonth, newYear);
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default CalendarPart;
