import { useState } from "react";
import LoginPage from "./components/LoginPage";
import Alert from "./components/Alert";
import MainPage from "./components/MainPage";

const getCookie = (name: string) => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookies ? cookies.split("=")[1] : null;
};

function App() {
  const username = getCookie("usernameForPapierowyRPG");
  const [logged, setLogged] = useState(username != null);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSetLogged = (current: boolean) => {
    setLogged(current);
    setAlertVisible(true);
  };

  //check for session cookie and if we find it set propper account and logged to true
  if (logged) {
    return alertVisible ? (
      <>
        <Alert
          text="Succesfully logged."
          type="success"
          onClose={() => setAlertVisible(false)}
        />
        <MainPage />
      </>
    ) : (
      <MainPage />
    );
  } else {
    return alertVisible ? (
      <>
        <Alert
          text="Wrong credentials!"
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

export default App;
