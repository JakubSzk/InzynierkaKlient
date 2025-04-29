import { useState } from "react";
import { GetCookie } from "./Cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FormAddCourse() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [privatebool, setPrivatebool] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [seats, setSeats] = useState(0);
  const [length, setLength] = useState(0);
  const [picture, setPicture] = useState("");
  const [idTeacher, setIdTeacher] = useState(0);

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivatebool(e.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let token = GetCookie("username");
    if (token == null) {
      token = "aa";
    }
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Private", privatebool.toString());
    formData.append("Seats", seats.toString());
    formData.append("When", selectedDate?.toISOString() ?? "");
    formData.append("Length", length.toString());
    formData.append("Picture", picture);
    formData.append("IdTeacher", idTeacher.toString());
    formData.append("token", token.toString());
    try {
      const response = await fetch(
        "https://localhost:7174/api/courses/create",
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
  };

  return (
    <form>
      <label htmlFor="name" className="form-label">
        Nazwa kursu:
      </label>
      <input
        className="form-control"
        id="name"
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label htmlFor="description" className="form-label">
        Opis:
      </label>
      <input
        className="form-control"
        id="description"
        onChange={(e) => setDescription(e.target.value)}
      ></input>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="private"
          onChange={handleSwitchChange}
        ></input>
        <label className="form-check-label" htmlFor="private">
          Prywatny
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="date">Data:</label>
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="form-control"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd-MM-yyyy HH:mm"
          placeholderText="Wybierz datę"
        ></DatePicker>
      </div>

      <label htmlFor="seats" className="form-label">
        Ilość miejsc:
      </label>
      <input
        type="number"
        className="form-control"
        id="seats"
        onChange={(e) => setSeats(parseInt(e.target.value))}
      ></input>

      <label htmlFor="length" className="form-label">
        Długość \(pełne godziny\):
      </label>
      <input
        type="number"
        className="form-control"
        id="length"
        onChange={(e) => setLength(parseInt(e.target.value))}
      ></input>

      <label htmlFor="picture" className="form-label">
        Zdjęcie:
      </label>
      <input
        className="form-control"
        id="picture"
        onChange={(e) => setPicture(e.target.value)}
      ></input>

      <label htmlFor="teacher" className="form-label">
        Id nauczyciela:
      </label>
      <input
        type="number"
        className="form-control"
        id="teacher"
        onChange={(e) => setIdTeacher(parseInt(e.target.value))}
      ></input>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Wyślij
      </button>
    </form>
  );
}

export default FormAddCourse;
