import { useState } from "react";
import SignUpPage from "./components/SignUpPage";
import Alert from "./components/Alert";

function SignApp() {
  const [alertVisible, setAlertVisible] = useState(false);

  return alertVisible ? (
    <>
      <Alert
        text="Account created."
        type="success"
        onClose={() => setAlertVisible(false)}
      />
      <SignUpPage handleAlert={() => setAlertVisible(true)} />
    </>
  ) : (
    <>
      <SignUpPage handleAlert={() => setAlertVisible(true)} />
    </>
  );
}

export default SignApp;
