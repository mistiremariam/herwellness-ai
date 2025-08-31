import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/components/App";
import "../src/componets/index"; // your global CSS
import { BrowserRouter } from "react-router-dom"; // optional if you want routing

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
