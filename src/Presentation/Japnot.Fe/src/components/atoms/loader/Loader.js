import React from "react";

export const Loader = ({ loading }) => {
  return (
    <div
      className="page-loader-wrapper bg-white"
      style={{ display: loading ? "block" : "none" }}
    >
      <div className="loader">
        <div className="m-t-30">
          <h1 className="text-center">JAPNOT</h1>
        </div>
        <p className="text-dark">Waiting...</p>
      </div>
    </div>
  );
};
