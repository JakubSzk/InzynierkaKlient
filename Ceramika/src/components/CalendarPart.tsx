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

  return (
    <div className="container justify-content-center " style={cellStyle}>
      <div
        className={`row justify-content-center ${
          currDay == 5 ? "bg-danger" : currDay == 1 ? "bg-warning" : ""
        }`}
      >
        <div className="col card bg-primary text-start">
          <h5 className="card-title">1</h5>
          <div style={{ paddingBottom: "5%" }}></div>
          <h6>Kursy Cykliczne 6</h6>
        </div>
        <div className="col card bg-primary"></div>
        <div className="col card bg-primary">11</div>
        <div className="col card bg-primary">11</div>
        <div className="col card bg-primary">11</div>
        <div className="col card bg-primary">11</div>
        <div className="col card bg-primary">11</div>
      </div>
      <div className="row  justify-content-center bg-danger">
        <div className="col card bg-primary text-start">
          <h5 className="card-title">1</h5>
          <div style={{ paddingBottom: "5%" }}></div>
          <h6>Kursy Cykliczne 6</h6>
        </div>
        <div className="col card bg-primary">11</div>
        <div className="col card bg-primary">11</div>
        <div className="col card bg-primary">11</div>
        <div className="col card bg-primary">11</div>
        <div className="col card bg-primary">11</div>
        <div className="col card bg-primary">11</div>
      </div>
      <div className="row  justify-content-center bg-danger">
        <div className="col card bg-primary text-start">
          <h5 className="card-title">1</h5>
          <div style={{ paddingBottom: "5%" }}></div>
          <h6>Kursy Cykliczne 6</h6>
        </div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
      </div>
      <div className="row  justify-content-center bg-danger">
        <div className="col card bg-primary text-start">
          <h5 className="card-title">1</h5>
          <div style={{ paddingBottom: "5%" }}></div>
          <h6>Kursy Cykliczne 6</h6>
        </div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
      </div>
      <div className="row  justify-content-center bg-danger">
        <div className="col card bg-primary text-start">
          <h5 className="card-title">1</h5>
          <div style={{ paddingBottom: "5%" }}></div>
          <h6>Kursy Cykliczne 6</h6>
        </div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
        <div className="col bg-primary">11</div>
      </div>
      <div className="row  justify-content-center bg-danger">
        <button className="col-1 bg-primary" onClick={() => onChangeDay(1)}>
          {"<"}
        </button>
        <div className="col-10 "></div>
        <button
          className="col-1 bg-primary"
          onClick={() => onChangeMonth(1, 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default CalendarPart;
