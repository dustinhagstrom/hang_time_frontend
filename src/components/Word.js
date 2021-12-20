import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import Letter from "./Letter";

// this component shows the word
function Word() {
  const wordBank = useSelector((state) => state.wordBank);
  const word = wordBank.word;
  const correctLetters = wordBank.correctLetters;

  const gameWordArray = [];
  for (let i = 0; i < word.length; i++) {
    gameWordArray.push(word[i]);
  }

  return (
    <Box>
      <Box
        id="wordContainer"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {gameWordArray.map((letter, index, array) => {
          let isVisible = false;

          if (correctLetters.includes(letter)) {
            isVisible = true;
          }

          return (
            <Letter
              letter={letter}
              key={letter + index + "-gameWord"}
              isVisible={isVisible}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default Word;
