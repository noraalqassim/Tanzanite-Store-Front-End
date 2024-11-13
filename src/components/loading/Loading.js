import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className="progress">
        <CircularProgress color="neutral" />
      </div>
    </div>
  );
}
