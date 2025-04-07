import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ShopApp from "./ShopApp.tsx";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar />
    <ShopApp />
  </StrictMode>
);
