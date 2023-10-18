import React from "react";

const ArchiveButton = ({ id, onArchive }) => {
  return (
    <button className="note-item__archive-button" onClick={() => onArchive(id)}>
      Arsipkan
    </button>
  );
};

export default ArchiveButton;
