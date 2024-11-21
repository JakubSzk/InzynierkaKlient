import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SignApp from "./SignApp.tsx";
import "bootstrap/dist/css/bootstrap.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SignApp />
  </StrictMode>
);
