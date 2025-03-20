interface Props {
  author: String;
  type: String;
  tags: String[];
  id: Number;
  price: Number;
  photos: String[];
  name: String;
  avaible: Number;
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

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-3">
          <img
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
              <div className="card">{data.tags[rowIndex]}</div>
            ))}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <h5>{data.price.toString()}zł</h5>
            <h6>Dostępne: {data.avaible.toString()}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemElement;
