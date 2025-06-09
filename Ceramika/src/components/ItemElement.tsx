interface Props {
  author: string;
  type: string;
  tags: string[];
  id: number;
  price: number;
  photos: string[];
  name: string;
  avaible: number;
  onChangeClicked: (clicked: number) => void;
}

function ItemElement({
  author,
  type,
  tags,
  id,
  price,
  photos,
  name,
  avaible,
  onChangeClicked,
}: Props) {
  const data = {
    id: id,
    name: name,
    type: type,
    model: "asd.3d",
    tags: tags,
    author: author,
    price: price,
    description: "",
    photos: photos,
    avaible: avaible,
  };
  const background = {
    backgroundColor: "#fff8ef",
  };
  const backgroundTag = {
    backgroundColor: "#f3d59b",
  };
  const maxHeight9 = {
    height: "180px",
  };
  return (
    <div
      className="card mb-3"
      style={background}
      onClick={() => onChangeClicked(id)}
    >
      <div className="row g-0">
        <div className="col-md-3">
          <img
            style={maxHeight9}
            src={"src/photos/" + data.photos[0]}
            className="img-fluid rounded-start"
          ></img>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <h4 className="card-title">{data.name}</h4>
            <h5>{data.type}</h5>
            <h6>{data.author}</h6>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            {Array.from({ length: data.tags.length }, (_, rowIndex) => (
              <div className="card" style={backgroundTag}>
                {data.tags[rowIndex]}
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <h5>{data.price.toString()} zł</h5>
            <h6>Dostępne: {data.avaible.toString()}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemElement;
