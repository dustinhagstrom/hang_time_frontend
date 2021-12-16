import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

function Letter(props) {
  const { letter, isVisible } = props;

  const wordBank = useSelector((state) => state.wordBank);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginRight: "10px",
        fontSize: "24px",
        minWidth: "20px",
      }}
    >
      <Typography
        sx={{
          visibility: isVisible ? "visible" : "hidden",
          textAlign: "center",
        }}
      >
        {letter}
      </Typography>
      <Typography
        sx={{
          borderBottom: "solid black 2px",
        }}
      ></Typography>
    </Box>
  );
}

export default Letter;
