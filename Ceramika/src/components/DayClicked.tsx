import React, { useState, useEffect } from "react";
import { GetCookie } from "./Cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  currDay: number;
  currMonth: number;
  currYear: number;
  currPrivate: Boolean;
}

interface DayCount {
  id: number;
  name: string;
  hour: number;
  lasts: number;
}

interface CourseModelDTO {
  id: number;
  name: string;
  description: string;
  seats: number;
  taken: number;
  length: number;
  picture: string;
  teacher: string;
}

const backgroundYellow300Style = {
  backgroundColor: "#7b4f2c",
};

const backgroundYellow200Style = {
  backgroundColor: "#f9e6d1",
};

const backgroundbutton = {
  backgroundColor: "#bf8a5a",
};
function DayClicked({ currDay, currMonth, currYear, currPrivate }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSet, setDataSet] = useState<DayCount[]>([]);
  const [dataId, setDataId] = useState(0); //
  const [isLoading2, setIsLoading2] = useState(false);
  const [dataCourse, setDataCourse] = useState<CourseModelDTO>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [length, setLength] = useState(0);
  const [seats, setSeats] = useState(0);

  const handleRegister = async () => {
    if (currPrivate) {
      let token = GetCookie("username");
      if (token == null) {
        token = "aa";
      }
      const formData = new FormData();
      formData.append("token", token.toString());
      formData.append("when", selectedDate?.toISOString() ?? "");
      formData.append("length", length.toString());
      formData.append("seats", seats.toString());
      try {
        const response = await fetch(
          "https://localhost:7174/api/courses/signPrivate",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) throw new Error("Request failed");

        console.log("done right", response);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      let token = GetCookie("username");
      if (token == null) {
        token = "aa";
      }
      const formData = new FormData();
      formData.append("token", token.toString());
      formData.append("course", dataId.toString());
      try {
        const response = await fetch(
          "https://localhost:7174/api/courses/sign",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) throw new Error("Request failed");

        console.log("done right", response);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!currPrivate) {
        setIsLoading2(true);
        try {
          const response = await fetch(
            `https://localhost:7174/api/courses/details?id=${dataId}`
          );

          if (!response.ok) {
            const newDataCourse: CourseModelDTO = {
              id: 0,
              name: "",
              description: "",
              seats: 0,
              taken: 0,
              length: 0,
              picture: "",
              teacher: "",
            };
          }
          const json = await response.json();
          const newDataCourse = {
            id: json["id"],
            name: json["name"],
            description: json["description"],
            seats: json["seats"],
            taken: json["taken"],
            length: json["length"],
            picture: json["picture"],
            teacher: json["teacherName"],
          };
          console.log(newDataCourse);
          setDataCourse(newDataCourse);
        } catch (error) {
          console.error("Błąd połączenia z API:", error);
        } finally {
          setIsLoading2(false);
        }
      }
    };
    fetchCourseData();
  }, [dataId]);

  useEffect(() => {
    setDataCourse({
      id: 0,
      name: "",
      description: "",
      seats: 0,
      taken: 0,
      length: 0,
      picture: "",
      teacher: "",
    });
  }, [currPrivate]);

  useEffect(() => {
    const fetchDayData = currPrivate
      ? async () => {
          setIsLoading(true);
          try {
            const response = await fetch(
              `https://localhost:7174/api/courses/avaibleHours?day=${currDay}&month=${
                currMonth + 1
              }&year=${currYear}`
            );

            if (!response.ok) {
              const newDataSet: DayCount[] = [
                { id: 0, name: " ", hour: 0, lasts: 0 },
              ];
            }

            const json = await response.json();
            const length = json.length;
            const newDataSet: DayCount[] = Array.from({ length }, (_, i) => ({
              id: json[i],
              name: " ",
              hour: json[i],
              lasts: 1,
            }));
            setDataSet(newDataSet);
          } catch (error) {
            console.error("Błąd połączenia z API:", error);
          } finally {
            setIsLoading(false);
          }
        }
      : async () => {
          setIsLoading(true);
          try {
            const response = await fetch(
              `https://localhost:7174/api/courses/perDay?day=${currDay}&month=${
                currMonth + 1
              }&year=${currYear}`
            );

            if (!response.ok) {
              const newDataSet: DayCount[] = [
                { id: 0, name: " ", hour: 0, lasts: 0 },
              ];
            }

            const json = await response.json();
            const length = json.length;
            const newDataSet: DayCount[] = Array.from({ length }, (_, i) => ({
              id: json[i]?.id || 0,
              name: json[i]?.name || " ",
              hour: json[i]?.hour || 0,
              lasts: json[i]?.lasts || 0,
            }));

            setDataSet(newDataSet);
          } catch (error) {
            console.error("Błąd połączenia z API:", error);
          } finally {
            setIsLoading(false);
          }
        };

    fetchDayData();
  }, [currDay]);

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8" style={backgroundYellow300Style}>
        {isLoading ? (
          <div>ładowanie danych</div>
        ) : (
          <div className="row" style={{ minHeight: "50px" }}>
            {dataSet.map((element, i) =>
              i == 0 ? (
                element.hour == 8 ? (
                  <div
                    style={{
                      width: `${12.5 * element.lasts}%`,
                      border: "1px solid black",
                      backgroundColor:
                        dataId == element.id ? "#7fb97f" : "#a3d9a5 ",
                    }}
                    onClick={() => setDataId(element.id)}
                  >
                    {element.name}
                  </div>
                ) : (
                  <div
                    className="row ms-0 me-0 pe-0 ps-0"
                    style={{
                      width: `${12.5 * (element.hour - 8 + element.lasts)}%`,
                    }}
                  >
                    <div
                      style={{
                        width: `${
                          (100 / (element.hour - 8 + element.lasts)) *
                          (element.hour - 8)
                        }%`,
                      }}
                    ></div>
                    <div
                      style={{
                        width: `${
                          (100 / (element.hour - 8 + element.lasts)) *
                          element.lasts
                        }%`,
                        border: "1px solid black",
                        backgroundColor:
                          dataId == element.id ? "#7fb97f" : "#a3d9a5 ",
                      }}
                      onClick={() => setDataId(element.id)}
                    >
                      {element.name}
                    </div>
                  </div>
                )
              ) : element.hour == dataSet[i - 1].hour + dataSet[i - 1].lasts ? (
                <div
                  style={{
                    width: `${12.5 * element.lasts}%`,
                    border: "1px solid black",
                    backgroundColor:
                      dataId == element.id ? "#7fb97f" : "#a3d9a5 ",
                  }}
                  onClick={() => setDataId(element.id)}
                >
                  {element.name}
                </div>
              ) : (
                <div
                  className="row ms-0 me-0 pe-0 ps-0"
                  style={{
                    width: `${
                      12.5 *
                      (element.hour -
                        (dataSet[i - 1].hour + dataSet[i - 1].lasts) +
                        element.lasts)
                    }%`,
                  }}
                >
                  <div
                    style={{
                      width: `${
                        (100 /
                          (element.hour -
                            (dataSet[i - 1].hour + dataSet[i - 1].lasts) +
                            element.lasts)) *
                        (element.hour -
                          (dataSet[i - 1].hour + dataSet[i - 1].lasts))
                      }%`,
                    }}
                  ></div>
                  <div
                    style={{
                      width: `${
                        (100 /
                          (element.hour -
                            (dataSet[i - 1].hour + dataSet[i - 1].lasts) +
                            element.lasts)) *
                        element.lasts
                      }%`,
                      border: "1px solid black",
                      backgroundColor:
                        dataId == element.id ? "#7fb97f" : "#a3d9a5 ",
                    }}
                    onClick={() => setDataId(element.id)}
                  >
                    {element.name}
                  </div>
                </div>
              )
            )}
          </div>
        )}
        <div className="row">
          <div
            style={{
              width: "12.5%",
              padding: "0px",
              borderLeft: "2px solid black",
            }}
          >
            8
          </div>
          <div
            style={{
              width: "12.5%",
              padding: "0px",
              borderLeft: "2px solid black",
            }}
          >
            9
          </div>
          <div
            style={{
              width: "12.5%",
              padding: "0px",
              borderLeft: "2px solid black",
            }}
          >
            10
          </div>
          <div
            style={{
              width: "12.5%",
              padding: "0px",
              borderLeft: "2px solid black",
            }}
          >
            11
          </div>
          <div
            style={{
              width: "12.5%",
              padding: "0px",
              borderLeft: "2px solid black",
            }}
          >
            12
          </div>
          <div
            style={{
              width: "12.5%",
              padding: "0px",
              borderLeft: "2px solid black",
            }}
          >
            13
          </div>
          <div
            style={{
              width: "12.5%",
              padding: "0px",
              borderLeft: "2px solid black",
            }}
          >
            14
          </div>
          <div
            style={{
              width: "12.5%",
              padding: "0px",
              borderLeft: "2px solid black",
            }}
          >
            15
          </div>
        </div>
        {isLoading2 ? (
          <div className="card mb-3" style={backgroundYellow200Style}>
            <div className="card-body">
              <h6 className="card-text">Loading</h6>
            </div>
          </div>
        ) : (
          <div className="card mb-3" style={backgroundYellow200Style}>
            <div className="row g-0">
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{dataCourse?.name}</h5>
                  <h6 className="card-text">{dataCourse?.teacher}</h6>
                  <h6 className="card-text">
                    {dataCourse?.seats == 0
                      ? ""
                      : "Miejsca zajęte " +
                        dataCourse?.taken +
                        "/" +
                        dataCourse?.seats}
                  </h6>
                  <h6>{dataCourse?.description}</h6>
                  {currPrivate ? (
                    <>
                      <form>
                        <label htmlFor="inputSeats">Ilość uczestników:</label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputSeats"
                          onChange={(e) => setSeats(parseInt(e.target.value))}
                        />
                        <label htmlFor="inputLength">Długość kursu:</label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputLength"
                          onChange={(e) => setLength(parseInt(e.target.value))}
                        ></input>
                        <div className="form-group">
                          <label htmlFor="date">Data:</label>
                          <DatePicker
                            id="date"
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="form-control"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            dateFormat="dd-MM-yyyy HH:mm"
                            placeholderText="Wybierz datę"
                          ></DatePicker>
                        </div>
                      </form>
                      <button
                        className="btn"
                        style={backgroundbutton}
                        onClick={handleRegister}
                      >
                        Rejestracja
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn"
                      style={backgroundbutton}
                      onClick={handleRegister}
                    >
                      Rejestracja
                    </button>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                {dataCourse?.picture == "" ||
                dataCourse?.picture == undefined ? (
                  <img
                    src={"src/photos/asd.png"}
                    className="img-fluid rounded-start"
                  ></img>
                ) : (
                  <img
                    src={"src/photos/" + dataCourse?.picture}
                    className="img-fluid rounded-start"
                  ></img>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default DayClicked;
