import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ShopApp from "./ShopApp.tsx";
import "bootstrap/dist/css/bootstrap.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ShopApp />
  </StrictMode>
);
