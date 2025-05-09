import { useState } from "react";
import Alert from "./components/Alert";
import LoginPage from "./components/LoginPage";
import ListPage from "./components/ListPage";

const getCookie = (name: string) => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookies ? cookies.split("=")[1] : null;
};

function ListApp() {
  const username = getCookie("username");
  const [logged, setLogged] = useState(username != null);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSetLogged = (current: boolean) => {
    setLogged(current);
    setAlertVisible(true);
  };

  if (logged) {
    return alertVisible ? (
      <>
        <Alert
          text="Pomyślnie zalogowano."
          type="success"
          onClose={() => setAlertVisible(false)}
        />
        <ListPage />
      </>
    ) : (
      <ListPage />
    );
  } else {
    return alertVisible ? (
      <>
        <Alert
          text="Błędne dane!"
          type="danger"
          onClose={() => setAlertVisible(false)}
        />
        <LoginPage handleSetLogged={handleSetLogged} />
      </>
    ) : (
      <LoginPage handleSetLogged={handleSetLogged} />
    );
  }
}

export default ListApp;
