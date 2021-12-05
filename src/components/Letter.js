import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Letter(props) {
  const { letterChar } = props;

  const wordObj = useSelector((state) => state.wordBank);
  const correctLettersArray = wordObj.correctLetters;

  const [letter, setLetter] = useState("");
  const [correctLetter, setCorrectLetter] = useState(false);

  useEffect(() => {
    setLetter(letterChar.letter);
    if (correctLettersArray.includes(letter)) {
      setCorrectLetter(true);
    }
  }, [wordObj]);
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
          visibility: correctLetter ? "visible" : "hidden",
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
