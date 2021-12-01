import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Letter from "./Letter";

// this component shows the word
function Word() {
  const word = useSelector((state) => state.wordBank);
  console.log(word);
  const [letters, setLetters] = useState([]);

  const addsLetters = () => {
    let letterHolder = [];
    for (let i = 0; i < word.length; i++) {
      letterHolder.push({ letter: word[i] });
    }
    setLetters(letterHolder);
    console.log("letterHolder :", letterHolder);
  };

  useEffect(() => {
    addsLetters();
  }, []);
  return (
    <Box>
      <Box
        id="wordContainer"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {letters.map((letter, index, array) => {
          console.log(letter);
          return <Letter letterChar={letter} key={index} />;
        })}
      </Box>
    </Box>
  );
}

export default Word;
