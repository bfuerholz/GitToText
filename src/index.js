// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Wenn Sie die Leistung Ihrer App messen möchten, übergeben Sie eine Funktion
// zum Protokollieren von Ergebnissen (z.B.: reportWebVitals(console.log))
// oder senden Sie an einen Endpunkt zur Analyse.
// Erfahren Sie mehr: https://bit.ly/CRA-vitals
reportWebVitals();
