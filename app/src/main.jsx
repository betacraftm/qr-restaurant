import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PositionProvider } from "./contexts/PositionContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PositionProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </PositionProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
