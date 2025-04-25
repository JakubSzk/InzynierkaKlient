import { lazy, Suspense, useState } from "react";
//import FormDeleteTag from "./components/FormDeleteTag";
//import FormAddTag from "./components/FormAddTag";

const FormAddTag = lazy(() => import("./components/FormAddTag"));
const FormDeleteTag = lazy(() => import("./components/FormDeleteTag"));
const FormTagItem = lazy(() => import("./components/FormTagItem"));
const FormAddPhoto = lazy(() => import("./components/FormAddPhoto"));
const FormDeletePhoto = lazy(() => import("./components/FormDeletePhoto"));
const FormPhotoItem = lazy(() => import("./components/FormPhotoItem"));
const FormAddItem = lazy(() => import("./components/FormAddItem"));

function AdminApp() {
  const [selected, setSelected] = useState(0);

  const titles: Record<number, string> = {
    0: "Wybierz",
    1: "Dodaj tag",
    2: "Usuń tag",
    3: "Dodaj tag do przedmiotu",
    4: "Dodaj zdjęcie",
    5: "Usuń zdjęcie",
    6: "Dodaj zdjęcie do przedmiotu",
    7: "Dodaj przedmiot",
  };

  const modules: Record<number, React.LazyExoticComponent<any>> = {
    1: FormAddTag,
    2: FormDeleteTag,
    3: FormTagItem,
    4: FormAddPhoto,
    5: FormDeletePhoto,
    6: FormPhotoItem,
    7: FormAddItem,
  };
  const SelectedModule = modules[selected] ?? FormAddTag;
  return (
    <div className="container min-vh-100 w-50 d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="card-header text-center">{titles[selected]}</div>
        <div className="card-body">
          {selected == 0 ? (
            <div className="d-flex flex-column">
              <button
                className="btn btn-outline-secondary mb-2"
                onClick={() => setSelected(1)}
              >
                Dodaj tag
              </button>
              <button
                className="btn btn-outline-secondary mb-2"
                onClick={() => setSelected(2)}
              >
                Usuń tag
              </button>
              <button
                className="btn btn-outline-secondary mb-2"
                onClick={() => setSelected(3)}
              >
                Dodaj tag do przedmiotu
              </button>
              <button
                className="btn btn-outline-secondary mb-2"
                onClick={() => setSelected(4)}
              >
                Dodaj zdjęcie
              </button>
              <button
                className="btn btn-outline-secondary mb-2"
                onClick={() => setSelected(5)}
              >
                Usuń zdjęcie
              </button>
              <button
                className="btn btn-outline-secondary mb-2"
                onClick={() => setSelected(6)}
              >
                Dodaj zdjęcie do przedmiotu
              </button>
              <button
                className="btn btn-outline-secondary mb-2"
                onClick={() => setSelected(7)}
              >
                Dodaj przedmiot
              </button>
            </div>
          ) : (
            <Suspense fallback={<div>Ładowanie...</div>}>
              <SelectedModule />
            </Suspense>
          )}
        </div>
        <div className="card-footer text-body-secondary">
          Ta strona nie działa poprawnie bez odpowiednich uprawnień.
        </div>
      </div>
    </div>
  );
}

export default AdminApp;
