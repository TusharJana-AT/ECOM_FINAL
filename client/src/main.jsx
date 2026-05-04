import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./routes/router";
import { store } from "./store";
import { AuthProvider } from "./auth/AuthContext";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <App/>
);
