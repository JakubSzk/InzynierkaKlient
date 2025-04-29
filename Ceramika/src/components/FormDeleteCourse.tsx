import { useState } from "react";
import { GetCookie } from "./Cookie";

function FormDeleteCourse() {
  const [courseId, setCourseId] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let token = GetCookie("username");
    if (token == null) {
      token = "aa";
    }
    const formData = new FormData();
    formData.append("id", courseId.toString());
    formData.append("token", token.toString());
    try {
      const response = await fetch(
        "https://localhost:7174/api/courses/delete",
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
      <label htmlFor="tagName" className="form-label">
        Id kursu:
      </label>
      <input
        className="form-control"
        id="tagName"
        type="number"
        onChange={(e) => setCourseId(parseInt(e.target.value))}
      ></input>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Wyślij
      </button>
    </form>
  );
}

export default FormDeleteCourse;
