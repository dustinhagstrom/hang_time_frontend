import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosErrorMessage } from "../Axios";
import { updateWordInDBOnPlayerTwoGuess } from "../Data";

function AlphabetButtons(props) {
  const { gameOver } = props;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const user = useSelector((state) => state.user);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const wordBank = useSelector((state) => state.wordBank);
  const word = wordBank.word;
  const emptyLetters = wordBank.emptyLetters;
  const correctLetters = wordBank.correctLetters;
  const incorrectLetters = wordBank.incorrectLetters;
  const gameID = wordBank.gameID;
  const strikes = wordBank.strikes;

  // console.log("word :", word, "strikes :", strikes);

  const isPlayerOne =
    user && playerOne && user.username === playerOne.username ? true : false;

  const arrayOfAlphabetLetters = [];
  for (let i = 0; i < alphabet.length; i++) {
    arrayOfAlphabetLetters.push(alphabet[i]);
  }

  const handlePlayerTwoGuess = (clickedLetter) => {
    let emptySpaceCount = emptyLetters;

    // console.log("wordBank :", wordBank);

    if (word.includes(clickedLetter)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === clickedLetter) {
          emptySpaceCount -= 1;
        }
      }
      let newCorrectLettersArray = [...correctLetters, clickedLetter];
      updateWordInDBOnPlayerTwoGuess({
        ...wordBank,
        correctLetters: newCorrectLettersArray,
        emptyLetters: emptySpaceCount,
      })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((e) => {
          axiosErrorMessage(e);
        });
    } else {
      let newIncorrectLettersArray = [...incorrectLetters, clickedLetter];
      updateWordInDBOnPlayerTwoGuess({
        ...wordBank,
        incorrectLetters: newIncorrectLettersArray,
        strikes: strikes + 1,
      })
        .then((res) => {
          console.log(res.message);
        })
        .catch((e) => {
          axiosErrorMessage(e);
        });
    }
  };

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        px={0}
      >
        {isPlayerOne
          ? arrayOfAlphabetLetters.map((letter, index, array) => {
              let letterColor = "black";

              if (correctLetters.includes(letter)) {
                letterColor = "green";
              }
              if (incorrectLetters.includes(letter)) {
                letterColor = "red";
              }
              return (
                <Grid item xs={2} key={letter + "-string"} px={0}>
                  <Box
                    variant="text"
                    sx={{ minWidth: "32px", padding: "0", cursor: "pointer" }}
                    px={6}
                    color={letterColor}
                  >
                    {letter}
                  </Box>
                </Grid>
              );
            })
          : arrayOfAlphabetLetters.map((letter, index, array) => {
              let isButtonDisabled = false;

              if (correctLetters.includes(letter)) {
                isButtonDisabled = true;
              }
              if (incorrectLetters.includes(letter)) {
                isButtonDisabled = true;
              }
              if (gameOver) {
                isButtonDisabled = true;
              }
              return (
                <Grid item xs={2} key={letter + "-button"} px={0}>
                  <Button
                    variant="text"
                    onClick={() => handlePlayerTwoGuess(letter)}
                    sx={{ minWidth: "32px", padding: "0" }}
                    px={6}
                    disabled={isButtonDisabled}
                  >
                    {letter}
                  </Button>
                </Grid>
              );
            })}
      </Grid>
    </>
  );
}

export default AlphabetButtons;
