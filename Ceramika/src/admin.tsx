import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar.tsx";
import AdminApp from "./AdminApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar />
    <AdminApp />
  </StrictMode>
);
