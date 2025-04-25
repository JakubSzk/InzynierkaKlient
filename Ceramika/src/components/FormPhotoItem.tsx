import { useState } from "react";
import { GetCookie } from "./Cookie";

function FormPhotoItem() {
  const [idItem, setIdItem] = useState(-1);
  const [photos, setPhotos] = useState([-1]);

  const handleAddPhoto = () => {
    setPhotos((prev) => [...prev, -1]);
  };

  const handleTagChange = (index: number, value: number) => {
    const newPhotos = [...photos];
    newPhotos[index] = value;
    setPhotos(newPhotos);
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
    photos.forEach((tag) => formData.append("idPhotos", tag.toString()));
    try {
      const response = await fetch(
        "https://localhost:7174/api/items/AddPhotosItem",
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
      <p>Id zdjęć:</p>
      {photos.map((photo, index) => (
        <input
          key={index}
          value={photo}
          onChange={(e) => handleTagChange(index, parseInt(e.target.value))}
          className="form-control"
          type="number"
        ></input>
      ))}
      <button
        className="btn btn-secondary"
        onClick={handleAddPhoto}
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

export default FormPhotoItem;
