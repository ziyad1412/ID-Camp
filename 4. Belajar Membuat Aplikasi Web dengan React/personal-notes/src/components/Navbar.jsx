import React from "react";
import NoteSearch from "./NoteSearch";

const Navbar = ({ searchNote }) => {
  return (
    <div className="note-app__navbar">
      <h1>Notes App</h1>
      <NoteSearch searchNote={searchNote} />
    </div>
  );
};

export default Navbar;
