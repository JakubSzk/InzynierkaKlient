import { useState } from "react";
import { GetCookie } from "./Cookie";

function FormAddItem() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [model, setModel] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let token = GetCookie("username");
    if (token == null) {
      token = "aa";
    }
    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("amount", amount.toString());
    formData.append("price", price.toString());
    formData.append("model", model);
    formData.append("author", author);
    formData.append("token", token.toString());
    try {
      const response = await fetch("https://localhost:7174/api/items/AddItem", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Request failed");

      console.log("done right", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form>
      <label htmlFor="tagName" className="form-label">
        Nazwa przedmiotu:
      </label>
      <input
        className="form-control"
        id="tagName"
        onChange={(e) => setItemName(e.target.value)}
      ></input>

      <label htmlFor="description" className="form-label">
        Opis:
      </label>
      <input
        className="form-control"
        id="description"
        onChange={(e) => setDescription(e.target.value)}
      ></input>

      <label htmlFor="type" className="form-label">
        Rodzaj przedmiotu:
      </label>
      <input
        className="form-control"
        id="type"
        onChange={(e) => setType(e.target.value)}
      ></input>

      <label htmlFor="amount" className="form-label">
        Ilość:
      </label>
      <input
        type="number"
        className="form-control"
        id="amount"
        onChange={(e) => setAmount(parseInt(e.target.value))}
      ></input>

      <label htmlFor="price" className="form-label">
        Cena:
      </label>
      <input
        type="number"
        className="form-control"
        id="price"
        onChange={(e) => setPrice(Number(e.target.value))}
      ></input>

      <label htmlFor="model" className="form-label">
        Model 3D przedmiotu:
      </label>
      <input
        className="form-control"
        id="model"
        onChange={(e) => setModel(e.target.value)}
      ></input>

      <label htmlFor="author" className="form-label">
        Autor:
      </label>
      <input
        className="form-control"
        id="author"
        onChange={(e) => setAuthor(e.target.value)}
      ></input>

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Wyślij
      </button>
    </form>
  );
}

export default FormAddItem;
