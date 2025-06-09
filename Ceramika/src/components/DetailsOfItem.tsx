import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

type ModelProps = {
  name: string;
};

function Model({ name }: ModelProps) {
  const { scene } = useGLTF("src/3dfiles/" + name);
  return <primitive object={scene} dispose={null} scale={1} />;
}

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
  const [model, setModel] = useState(false);

  const handleBuy = async () => {
    const responsee = await fetch(
      `https://localhost:7174/api/items/Buy?id=${result?.id.toString()}`
    );
    if (!responsee.ok) {
      throw new Error(`Błąd sieci: ${responsee.status}`);
    }
  };
  const background = {
    backgroundColor: "#edd3b0",
  };
  const backgroundBtn = {
    backgroundColor: "#855e42",
  };
  const backgroundBtn2 = {
    backgroundColor: "#a67c52",
  };

  const handleChangePhotoRight = () => {
    if (selected + 1 == result?.photos.length) setSelected(0);
    else setSelected(selected + 1);
  };

  const handleChangePhotoLeft = () => {
    if (selected - 1 >= 0 && result != null) setSelected(selected - 1);
    else setSelected((result?.photos.length ?? 1) - 1);
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
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    handleStart();
    setLoading(false);
  }, []);

  return loading ? (
    <div>ładowanie</div>
  ) : model ? (
    <div>
      <button
        onClick={() => setModel(false)}
        className="btn m-1 col-1"
        style={backgroundBtn2}
      >
        {"<-- Back"}
      </button>

      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{ position: "absolute" }}
      >
        <color attach="background" args={["#101010"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <PresentationControls speed={1.5} global zoom={0.5}>
          <Stage environment={null}>
            <Model name={result?.model ?? ""} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  ) : (
    <div>
      <div className="row">
        <button
          onClick={() => onChangeClicked(-1)}
          className="btn m-1 col-1"
          style={backgroundBtn2}
        >
          {"<-- Back"}
        </button>
      </div>
      <div className="row">
        <div className="col-2 col-lg-3"></div>
        <div
          className="col-8 col-lg-6 justify-content-center"
          style={background}
        >
          <div className="row align-items-stretch">
            <button
              onClick={handleChangePhotoLeft}
              className="btn rounded-0 rounded-start p-0 col-1 "
              style={backgroundBtn}
            >
              {"<"}
            </button>
            <img
              className="img-fluid p-0 col-10 "
              src={"src/photos/" + result?.photos[selected]}
            ></img>
            <button
              onClick={handleChangePhotoRight}
              className="btn p-0 rounded-0 rounded-end col-1"
              style={backgroundBtn}
            >
              {">"}
            </button>
          </div>

          <div className="row ">
            <h3 className="col-10">{result?.name}</h3>

            <button
              className="col-2 btn"
              style={backgroundBtn2}
              onClick={() => setModel(true)}
            >
              3D
            </button>
          </div>
          <div className="row">
            <h3 className="col-6">{result?.author}</h3>
            <h3 className="col-6 text-end">{result?.price + " zł"}</h3>
          </div>
          <div className="row">
            <h3 className="col-6">{result?.type}</h3>
            <h3 className="col-6 text-end">Pozostało {result?.avaible} szt</h3>
          </div>
          <div className="row">
            <h4 className="border rounded">{result?.description}</h4>
          </div>

          {result?.tags.map((item, index) => (
            <span className="border rounded p-1">{item}</span>
          ))}
          <div className="row">
            <button className="btn" style={backgroundBtn2} onClick={handleBuy}>
              Kup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsOfItem;
