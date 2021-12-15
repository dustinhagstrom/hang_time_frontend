import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

function Strikes() {
  const strikes = useSelector((state) => state.wordBank.strikes);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#999",
        minWidth: "300px",
        flexDirection: "column",
      }}
    >
      <Typography>Strikes</Typography>
      <svg style={{ maxHeight: "100", maxWidth: "150" }}>
        {strikes >= 1 ? (
          <line
            x1="25"
            y1="0"
            x2="25"
            y2="100"
            style={{ stroke: "#000", strokeWidth: "2" }}
          />
        ) : (
          <></>
        )}
        {strikes >= 2 ? (
          <line
            x1="50"
            y1="100"
            x2="50"
            y2="0"
            style={{ stroke: "#000", strokeWidth: "2" }}
          />
        ) : (
          <></>
        )}
        {strikes >= 3 ? (
          <line
            x1="75"
            y1="100"
            x2="75"
            y2="0"
            style={{ stroke: "#000", strokeWidth: "2" }}
          />
        ) : (
          <></>
        )}
        {strikes >= 4 ? (
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="0"
            style={{ stroke: "#000", strokeWidth: "2" }}
          />
        ) : (
          <></>
        )}
        {strikes >= 5 ? (
          <line
            x1="25"
            y1="0"
            x2="100"
            y2="100"
            style={{ stroke: "#000", strokeWidth: "2" }}
          />
        ) : (
          <></>
        )}
        {strikes >= 6 ? (
          <line
            x1="135"
            y1="100"
            x2="135"
            y2="0"
            style={{ stroke: "#000", strokeWidth: "2" }}
          />
        ) : (
          <></>
        )}
      </svg>
    </Box>
  );
}

export default Strikes;
