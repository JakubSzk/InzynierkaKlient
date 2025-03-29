import { useEffect, useState } from "react";

interface Props {
  id: number;
  onChangeClicked: (clicked: number) => void;
}

function DetailsOfItem({ id, onChangeClicked }: Props) {
  type Result = {
    id: number;
    name: string;
    type: string;
    model: string;
    tags: string[];
    author: string;
    price: number;
    description: string;
    photos: string[];
    avaible: number;
  };

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>();
  const [selected, setSelected] = useState(0);

  const maxWidthButton = {
    maxWidth: "50px",
  };

  const maxWidthImg = {
    maxWidth: "1000px",
  };
  const maxWidthContainer = {
    maxWidth: "1100px",
  };

  const handleChangePhotoRight = () => {
    if (selected + 1 == result?.photos.length) setSelected(0);
    else setSelected(selected + 1);
  };

  const handleChangePhotoLeft = () => {
    if (selected - 1 == 0 && result != null)
      setSelected(result?.photos.length - 1);
    else setSelected(selected - 1);
  };

  useEffect(() => {
    setLoading(true);
    const handleStart = async () => {
      try {
        const response = await fetch(
          `https://localhost:7174/api/items/Details?idItem=${id}`
        );
        if (!response.ok) throw new Error("Request failed");
        setResult(await response.json());
        console.log(result);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    handleStart();
    setLoading(false);
  }, []);

  return loading ? (
    <div>loading</div>
  ) : (
    <div>
      <div className="row">
        <button
          onClick={() => onChangeClicked(-1)}
          className="btn m-1 col-1 btn-secondary"
        >
          {"<-- Back"}
        </button>
      </div>
      <div className="row">
        <div className="col-2 col-lg-3"></div>
        <div className="col-8 col-lg-6 justify-content-center">
          <div className="row align-items-stretch">
            <button
              onClick={handleChangePhotoLeft}
              className="btn rounded-0 rounded-start p-0 col-1 btn-outline-secondary"
            >
              {"<"}
            </button>
            <img
              className="img-fluid p-0 col-10 "
              src={"src/photos/" + result?.photos[selected]}
            ></img>
            <button
              onClick={handleChangePhotoRight}
              className="btn p-0 rounded-0 rounded-end col-1 btn-outline-secondary"
            >
              {">"}
            </button>
          </div>

          <div className="row ">
            <h3 className="col-10">{result?.name}</h3>

            <button className="col-2 btn btn-secondary">3D</button>
          </div>
          <div className="row">
            <h3 className="col-6">{result?.author}</h3>
            <h3 className="col-6 text-end">{result?.price + "zł"}</h3>
          </div>
          <div className="row">
            <h3 className="col-6">{result?.type}</h3>
            <h3 className="col-6 text-end">Pozostało {result?.avaible}szt</h3>
          </div>
          <div className="row">
            <h4 className="border rounded">{result?.description}</h4>
          </div>

          {result?.tags.map((item, index) => (
            <span className="border rounded p-1">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailsOfItem;
