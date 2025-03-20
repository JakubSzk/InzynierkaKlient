import { useEffect, useState } from "react";
import ItemElement from "./components/ItemElement";

function ShopApp() {
  type Result = {
    id: Number;
    name: String;
    type: String;
    model: String;
    tags: String[];
    author: String;
    price: Number;
    description: String;
    photos: String[];
    avaible: Number;
  };
  const [isLoading, setIsLoading] = useState(false);
  const [authors, setAuthors] = useState([""]);
  const [types, setTypes] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [tagsList, setTagsList] = useState([""]);
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const [data, setData] = useState<Result[]>();

  const handleAddTag = () => {
    setTags((prev) => [...prev, ""]);
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("min", min.toString());
    formData.append("max", max.toString());
    formData.append("author", author);
    formData.append("type", type);
    tags.forEach((tag) => formData.append("tags", tag));

    try {
      const response = await fetch("https://localhost:7174/api/items/List", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Request failed");

      setData(await response.json());
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [authorsResponse, typesResponse, tagsResponse] =
          await Promise.all([
            fetch("https://localhost:7174/api/items/AuthorsList"),
            fetch("https://localhost:7174/api/items/TypesList"),
            fetch("https://localhost:7174/api/items/TagsList"),
          ]);

        setAuthors(await authorsResponse.json());
        setTypes(await typesResponse.json());
        setTagsList(await tagsResponse.json());

        console.log(authors, types, tagsList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return isLoading ? (
    <div>loading</div>
  ) : (
    <div className="row">
      <div className="col-2"></div>

      <div className="col-8">
        <div className="card">
          <div className="card-header text-center">
            <h5 className="card-title">Filters</h5>
          </div>
          <div className="card-body">
            <form className="row">
              <div className="col">
                <label htmlFor="inputAuthor">Author:</label>
                <select
                  className="form-select mb-2"
                  onChange={(e) => setAuthor(e.target.value)}
                  id="inputAuthor"
                >
                  <option value="">Author</option>
                  {authors.map((author, index) => (
                    <option key={index} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label htmlFor="inputType">Type:</label>
                <select
                  onChange={(e) => setType(e.target.value)}
                  id="inputType"
                >
                  <option value="">Type</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <h5>Price</h5>
                <div className="row">
                  <div className="col">
                    <label htmlFor="inputMin">Min:</label>
                    <input
                      id="inputMin"
                      value={min}
                      onChange={(e) => setMin(parseFloat(e.target.value))}
                      type="number"
                    ></input>
                  </div>
                  <div className="col">
                    <label htmlFor="inputMax">Max:</label>
                    <input
                      id="inputMax"
                      value={max}
                      onChange={(e) => setMax(parseFloat(e.target.value))}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="col">
                <h6>Tags:</h6>
                {tags.map((tag, index) => (
                  <select
                    key={index}
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="form-select mb-2"
                  >
                    <option value="" disabled>
                      Select tag
                    </option>
                    {tagsList.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                ))}

                <button
                  className="btn btn-secondary"
                  onClick={handleAddTag}
                  type="button"
                >
                  +
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <br></br>
        {data?.map((result) => (
          <ItemElement
            author={result.author}
            type={result.type}
            tags={result.tags}
            id={result.id}
            price={result.price}
            photos={result.photos}
            name={result.name}
            avaible={result.avaible}
          />
        ))}
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default ShopApp;
