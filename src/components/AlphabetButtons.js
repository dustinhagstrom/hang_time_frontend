import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCorrectLettersToWord, addIncorrectLettersToWord } from "../Data";
import {
  updateCorrectLettersActionCreator,
  updateIncorrectLettersActionCreator,
} from "../redux/wordState";

function AlphabetButtons(props) {
  const {
    word,
    setCurrentStrikes,
    currentStrikes,
    setLetters,
    emptyLetters,
    filledLetter,
    setIncorrectLetter,
    incorrectLetter,
    user,
    playerOne,
    playerTwo,
    disableButtonsOnGameOver,
    gameID,
  } = props;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const wordBank = useSelector((state) => state.wordBank);
  const correctLetters = wordBank.correctLetters;
  const incorrectLetters = wordBank.incorrectLetters;

  const [alphabetJSXArray, setAlphabetJSXArray] = useState([]);

  const strikeRef = useRef(false); //ref used to help track strikes.
  const emptyLettersRef = useRef(false); //empty spaces ref.
  const incorrectLettersRef = useRef(false); //incorrect letters ref.

  const dispatch = useDispatch();

  //player 2 func remove letter button after it is clicked
  const styleButtonAfterItIsClicked = (e) => {
    e.target.disabled = true;
    e.target.style = "visibility: hidden";
  };

  //player 2 func onClick vis: hidden for letter buttons
  let incorrectLetterToPush = incorrectLetter;
  let correctLetterToPush = filledLetter;
  let emptySpaceCount = emptyLetters;

  const chosenLetter = async (e) => {
    const clickedLetter = e.target.name;
    styleButtonAfterItIsClicked(e);
    if (word.includes(clickedLetter)) {
      //loop through word to populate letters.
      for (let i = 0; i < word.length; i++) {
        if (word[i] === clickedLetter) {
          correctLetterToPush = clickedLetter;
          emptySpaceCount -= 1;
        }
      }
      // TODO hit the db for update correctLetters && emptyLetters
      emptyLettersRef.current = true;
      setLetters({
        emptyLetters: emptySpaceCount,
        filledLetter: correctLetterToPush,
      });
    } else {
      // TODO: hit the db to update incorrectLetters && strikes
      incorrectLetterToPush = clickedLetter;
      incorrectLettersRef.current = true;
      setIncorrectLetter(incorrectLetterToPush);
      strikeRef.current = true;
      setCurrentStrikes(currentStrikes + 1);
    }
  };

  //player one func to change color of letter display
  let alphabetLettersArray = [];
  const changeColorOfChosenLetters = () => {
    for (let i = 0; i < alphabet.length; i++) {
      let currentLetter = alphabet[i].toUpperCase();
      let currentLetterContainer = {
        [`letter${alphabet[i]}`]: document.getElementById(
          `${alphabet[i]}-container`
        ),
      };
      alphabetLettersArray.push(currentLetterContainer);
      //correct letter
      if (correctLetters.includes(currentLetter)) {
        alphabetLettersArray[i][`letter${alphabet[i]}`].style.color = "green";
      }
      //incorrect letter
      if (incorrectLetters.includes(currentLetter)) {
        alphabetLettersArray[i][`letter${alphabet[i]}`].style.color = "red";
      }
    }
  };

  // player 2 buttons to guess letters
  const generatesTheAlphabetButtons = () => {
    let alphabetElementsArray = [];
    for (let i = 0; i < alphabet.length; i++) {
      alphabetElementsArray.push(
        <Grid item xs={2} key={alphabet[i] + "-letter-button"} px={0}>
          <Button
            variant="text"
            onClick={chosenLetter}
            name={alphabet[i]}
            sx={{ minWidth: "32px", padding: "0" }}
            px={6}
            id={alphabet[i] + "-button"}
            disabled={disableButtonsOnGameOver}
          >
            {alphabet[i]}
          </Button>
        </Grid>
      );
    }
    setAlphabetJSXArray(alphabetElementsArray);
  };

  // player 1 letter display to show which letters P2 picks
  const generatesTheAlphabet = () => {
    let alphabetElementsArray = [];
    for (let i = 0; i < alphabet.length; i++) {
      alphabetElementsArray.push(
        <Grid item xs={2} key={alphabet[i] + "-letter-container"} px={0}>
          <Typography
            variant="string"
            sx={{ minWidth: "32px", padding: "0" }}
            px={6}
            id={alphabet[i] + "-container"}
          >
            {alphabet[i]}
          </Typography>
        </Grid>
      );
    }
    setAlphabetJSXArray(alphabetElementsArray);
  };

  useEffect(() => {
    //when a strike occurs
    if (strikeRef.current && incorrectLettersRef.current) {
      strikeRef.current = false;
      incorrectLettersRef.current = false;
      // dispatch(newStrikeActionCreator({ strikes: currentStrikes }));
      dispatch(
        updateIncorrectLettersActionCreator({
          incorrectLetters: incorrectLetter,
          wordBank,
          strikes: currentStrikes,
        })
      );
      addIncorrectLettersToWord({
        incorrectLetters: incorrectLetter,
        gameID,
        strikes: currentStrikes,
      });
    } //when empty space filled with a letter
    if (emptyLettersRef.current) {
      emptyLettersRef.current = false;
      dispatch(
        updateCorrectLettersActionCreator({
          correctLetters: correctLetterToPush,
          emptyLetters: emptySpaceCount,
          wordBank,
        })
      );
      addCorrectLettersToWord({
        correctLetters: correctLetterToPush,
        emptyLetters: emptySpaceCount,
        gameID,
      });
    } //letter display for player one
    if (user && playerOne && user.username === playerOne.username) {
      console.log("we aren't player two");
      generatesTheAlphabet();
    } //letter display for player two
    if (user && playerTwo && user.username === playerTwo.username) {
      generatesTheAlphabetButtons();
    }
    if (
      //change color of letters for player one
      alphabetJSXArray.length !== 0 &&
      user &&
      playerOne &&
      user.username === playerOne.username
    ) {
      console.log("this code block running like it should");
      changeColorOfChosenLetters();
    }
  }, [
    currentStrikes,
    emptyLetters,
    incorrectLetter,
    filledLetter,
    wordBank,
    disableButtonsOnGameOver,
  ]);

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        px={0}
      >
        {alphabetJSXArray}
      </Grid>
    </>
  );
}

export default AlphabetButtons;
