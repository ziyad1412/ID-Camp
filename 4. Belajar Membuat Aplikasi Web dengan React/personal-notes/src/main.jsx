import React from "react";
import ReactDOM from "react-dom/client";
// import style
import "./styles/style.css";
import NotesApp from "./components/NotesApp.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotesApp />
  </React.StrictMode>
);
