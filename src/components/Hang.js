import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Hang() {
  // the word is stored in wordBank in the server. could store here but then people could cheat.
  const user = useSelector((state) => state.user);
  const strikes = useSelector((state) => state.strikes);

  return (
    <Box sx={{ height: "100%" }}>
      <svg
        style={{
          display: "flex",
          flex: 1,
          flexBasis: 200,
          background: "#BBB",
          width: "100%",
          height: "100%",
        }}
      >
        {/* below is the hangman's noose */}
        <line
          x1="25"
          y1="375"
          x2="100"
          y2="375"
          style={{ stroke: "#000", strokeWidth: "2" }}
        />
        <line
          x1="50"
          y1="15"
          x2="50"
          y2="375"
          style={{ stroke: "#000", strokeWidth: "2" }}
        />
        <line
          x1="50"
          y1="15"
          x2="150"
          y2="15"
          style={{ stroke: "#000", strokeWidth: "2" }}
        />
        <line
          x1="150"
          y1="15"
          x2="150"
          y2="55"
          style={{ stroke: "#000", strokeWidth: "2" }}
        />
        {/* below is the stick person */}

        {strikes >= 1 ? (
          <circle
            cx="150"
            cy="90"
            r="35"
            style={{
              stroke: "black",
              strokeWidth: "2",
              fill: "transparent",
            }}
          />
        ) : (
          <></>
        )}
        {strikes >= 2 ? (
          <line
            x1="150"
            y1="125"
            x2="150"
            y2="250"
            style={{ stroke: "#000", strokeWidth: "2" }}
          />
        ) : (
          <></>
        )}
        {strikes >= 3 ? (
          <line
            x1="150"
            y1="150"
            x2="225"
            y2="150"
            style={{ stroke: "#000", strokeWidth: "2" }}
          />
        ) : (
          <></>
        )}
        {strikes >= 4 ? (
          <line
            x1="75"
            y1="150"
            x2="150"
            y2="150"
            style={{ stroke: "#000", strokeWidth: "2" }}
          />
        ) : (
          <></>
        )}
        {strikes >= 5 ? (
          <line
            x1="75"
            y1="325"
            x2="150"
            y2="250"
            style={{ stroke: "#000", strokeWidth: "2" }}
          />
        ) : (
          <></>
        )}
        {strikes >= 6 ? (
          <line
            x1="150"
            y1="250"
            x2="225"
            y2="325"
            style={{ stroke: "#000", strokeWidth: "2" }}
          />
        ) : (
          <></>
        )}
      </svg>
    </Box>
  );
}

export default Hang;
