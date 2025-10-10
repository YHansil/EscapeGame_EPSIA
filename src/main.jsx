
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { JournalProvider } from "./context/JournalContext"; // 👈 import du provider
import "./styles/journal.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <JournalProvider>
      <App />
    </JournalProvider>
  </React.StrictMode>
);
