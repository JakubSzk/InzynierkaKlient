import { useEffect, useState } from "react";
import { GetCookie } from "./Cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ListPage() {
  type Result = {
    id: number;
    name: string;
    description: string;
    private: boolean;
    taken: number;
    seats: number;
    when: Date;
    length: number;
    picture: string;
    teacher: string;
  };
  const background = {
    backgroundColor: "#fff8ef",
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Result[]>([]);

  useEffect(() => {
    const handleLoad = async () => {
      setLoading(true);
      let token = GetCookie("username");
      if (token == null) {
        token = "aa";
      }
      const formData = new FormData();
      formData.append("token", token.toString());
      try {
        const response = await fetch(
          "https://localhost:7174/api/courses/listForUser",
          {
            method: "POST",
            body: formData,
          }
        );
        const dataa = await response.json();
        let converter: Result[] = dataa.map((element: any) => ({
          id: element["id"],
          name: element["name"],
          description: element["description"],
          private: element["private"],
          taken: element["taken"],
          seats: element["seats"],
          when: new Date(element["when"]),
          length: element["length"],
          picture: element["picture"],
          teacher: element["teacherName"],
        }));
        setData(converter);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    handleLoad();
    setLoading(false);
  }, []);

  return loading ? (
    <div>Ładowanie</div>
  ) : (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8">
        {data.map((element) => (
          <div
            className="row border border-2 border-dark rounded p-3 m-2"
            style={background}
          >
            <div className="col">
              <h4 className="row">{element.name}</h4>
              <h5 className="row">{element.teacher}</h5>
            </div>
            <div className="col">
              <h5 className="text-end row">
                {element.when.toLocaleString("pl-PL", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </h5>
              <h6 className="text-end row">
                {"Długość: " + element.length.toString() + " godz."}
              </h6>
            </div>
          </div>
        ))}
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default ListPage;
