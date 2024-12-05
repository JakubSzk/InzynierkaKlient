interface Props {
  onChangeDay: (day: number) => void;
  onChangeMonth: (month: number, year: number) => void;
  currDay: number;
  currMonth: number;
  currYear: number;
}

function CalendarPart({
  onChangeDay,
  onChangeMonth,
  currDay,
  currMonth,
  currYear,
}: Props) {
  const cellStyle = {
    maxWidth: "800px",
    minWidth: "700px",
  };

  var length = 30;
  switch (currMonth) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      length = 31;
      break;
    case 1:
      if (currYear % 4 == 0) length = 29;
      else length = 28;
      break;
    default:
      break;
  }

  var name = "";
  switch (currMonth) {
    case 0:
      name = "Styczeń";
      break;
    case 1:
      name = "Luty";
      break;
    case 2:
      name = "Marzec";
      break;
    case 3:
      name = "Kwiecień";
      break;
    case 4:
      name = "Maj";
      break;
    case 5:
      name = "Czerwiec";
      break;
    case 6:
      name = "Lipiec";
      break;
    case 7:
      name = "Sierpień";
      break;
    case 8:
      name = "Wrzesień";
      break;
    case 9:
      name = "Październik";
      break;
    case 10:
      name = "Listopad";
      break;
    case 11:
      name = "Grudzień";
      break;
    default:
      break;
  }

  var first = new Date(currYear, currMonth, 1).getDay() as number;
  if (first == 0) first = 7;

  return (
    <div className="container justify-content-center " style={cellStyle}>
      <div className="row  justify-content-center bg-danger">
        <h2 className="text-center">{name + " " + currYear}</h2>
      </div>
      {Array.from({ length: 6 }, (_, index) => index + 1).map((num) => (
        <div className="row  justify-content-center bg-danger">
          {Array.from({ length: 7 }, (_, index) => index + 1).map((num2) =>
            num * 7 + num2 - 7 < first ||
            num * 7 + num2 - 7 - first >= length ? (
              <div className="col card bg-primary"></div>
            ) : (
              <div className="col card bg-primary">
                <h5 className="card-title">{num * 7 + num2 - 6 - first}</h5>
                <div style={{ paddingBottom: "5%" }}></div>
                <h6>Kursy Cykliczne 6</h6>
              </div>
            )
          )}
        </div>
      ))}

      <div className="row  justify-content-center bg-danger">
        <button
          className="col-1 bg-primary"
          onClick={() => {
            const newMonth = (currMonth + 11) % 12;
            const newYear = newMonth === 11 ? currYear - 1 : currYear;
            onChangeMonth(newMonth, newYear);
          }}
        >
          {"<"}
        </button>
        <div className="col-10 "></div>
        <button
          className="col-1 bg-primary"
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
