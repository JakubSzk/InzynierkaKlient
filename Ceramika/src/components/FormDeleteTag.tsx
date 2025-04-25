import { useState } from "react";
import { GetCookie } from "./Cookie";

function FormDeleteTag() {
  const [tagName, setTagName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let token = GetCookie("username");
    if (token == null) {
      token = "aa";
    }
    const formData = new FormData();
    formData.append("tag", tagName);
    formData.append("token", token.toString());
    try {
      const response = await fetch(
        "https://localhost:7174/api/items/DeleteTag",
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
        Nazwa tagu:
      </label>
      <input
        className="form-control"
        id="tagName"
        onChange={(e) => setTagName(e.target.value)}
      ></input>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Wyślij
      </button>
    </form>
  );
}

export default FormDeleteTag;
