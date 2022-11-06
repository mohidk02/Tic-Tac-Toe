import { createRoot } from "react-dom/client";

import Tictac from "./tictac";
import "./App.css";
import { StrictMode } from "react";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Tictac />
  </StrictMode>
);
