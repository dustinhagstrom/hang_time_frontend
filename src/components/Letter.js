import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";

function Letter(props) {
  const { letterChar } = props;
  console.log("letterChar: ", letterChar);
  const [letter, setLetter] = useState("");
  const [correctLetter, setCorrectLetter] = useState("");

  const correctLetterInput = () => {
    //TODO: make a function that checks if a supplied letter matches the word for the game.
  };

  useEffect(() => {
    setLetter(letterChar.letter);
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        sx={{
          borderBottom: "solid black 2px",
          display: "flex",
          justifyContent: "center",
          marginRight: "10px",
          fontSize: "24px",
          minWidth: "20px",
        }}
      >
        {letter}
      </Typography>
    </Box>
  );
}

export default Letter;
