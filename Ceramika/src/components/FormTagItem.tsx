import { useState } from "react";
import { GetCookie } from "./Cookie";

function FormTagItem() {
  const [idItem, setIdItem] = useState(-1);
  const [tags, setTags] = useState([-1]);

  const handleAddTag = () => {
    setTags((prev) => [...prev, -1]);
  };

  const handleTagChange = (index: number, value: number) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let token = GetCookie("username");
    if (token == null) {
      token = "aa";
    }
    const formData = new FormData();
    formData.append("idItem", idItem.toString());
    formData.append("token", token.toString());
    tags.forEach((tag) => formData.append("idTags", tag.toString()));
    try {
      const response = await fetch(
        "https://localhost:7174/api/items/AddTagsItem",
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
        Id przedmiotu:
      </label>
      <input
        className="form-control"
        id="tagName"
        type="number"
        onChange={(e) => setIdItem(parseInt(e.target.value))}
      ></input>
      <p>Id tagów:</p>
      {tags.map((tag, index) => (
        <input
          key={index}
          value={tag}
          onChange={(e) => handleTagChange(index, parseInt(e.target.value))}
          className="form-control"
          type="number"
        ></input>
      ))}
      <button
        className="btn btn-secondary"
        onClick={handleAddTag}
        type="button"
      >
        +
      </button>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Wyślij
      </button>
    </form>
  );
}

export default FormTagItem;
