import React from "react";

export const Spinner = ({ loading }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: loading ? "flex" : "none",
        background: "white",
        zIndex: 99,
        borderRadius: 8,
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden" />
      </div>
    </div>
  );
};
