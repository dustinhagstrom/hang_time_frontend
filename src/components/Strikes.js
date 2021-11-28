import { Box } from "@mui/system";
import React from "react";

function Strikes() {
  return (
    <Box>
      <svg
        style={{
          display: "flex",
          flex: 1,
          //   flexBasis: 200,
          background: "#999",
          minWidth: "100px",
          height: "100%",
        }}
      >
        <line
          x1="25"
          y1="0"
          x2="100"
          y2="100"
          style={{ stroke: "#000", strokeWidth: "2" }}
        />
        <line
          x1="25"
          y1="0"
          x2="25"
          y2="100"
          style={{ stroke: "#000", strokeWidth: "2" }}
        />
        <line
          x1="50"
          y1="100"
          x2="50"
          y2="0"
          style={{ stroke: "#000", strokeWidth: "2" }}
        />
        <line
          x1="75"
          y1="100"
          x2="75"
          y2="0"
          style={{ stroke: "#000", strokeWidth: "2" }}
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="0"
          style={{ stroke: "#000", strokeWidth: "2" }}
        />
      </svg>
    </Box>
  );
}

export default Strikes;
