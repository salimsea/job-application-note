import React from "react";

export const ButtonPagination = ({ content, onClick, active, disabled }) => {
  return (
    <li className={`page-item ${active ? "active" : ""}`}>
      <button className="page-link" onClick={onClick} disabled={disabled}>
        {content}
      </button>
    </li>
  );
};
