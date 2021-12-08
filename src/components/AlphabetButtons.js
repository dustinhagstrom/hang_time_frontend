import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newStrikeActionCreator } from "../redux/strikeState";
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
  } = props;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const correctLetters = useSelector((state) => state.wordBank.correctLetters);
  const incorrectLetters = useSelector(
    (state) => state.wordBank.incorrectLetters
  );

  const [alphabetJSXArray, setAlphabetJSXArray] = useState([]);

  const strikeRef = useRef(false); //ref used to help track strikes.
  const emptyLettersRef = useRef(false); //empty spaces ref.
  const incorrectLettersRef = useRef(false); //incorrect letters ref.

  const dispatch = useDispatch();

  const styleButtonAfterItIsClicked = (e) => {
    //player 2 func only
    e.target.disabled = true;
    e.target.style = "visibility: hidden";
  };

  //var's for chosenLetter func
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
      // TODO: hit the db to update incorrectLetters && emptyLetters
      incorrectLetterToPush = clickedLetter;
      incorrectLettersRef.current = true;
      setIncorrectLetter(incorrectLetterToPush);
      strikeRef.current = true;
      setCurrentStrikes(currentStrikes + 1);
    }
  };

  let alphabetLettersArray = [];
  const changeColorOfChosenLetters = () => {
    for (let i = 0; i < alphabet.length; i++) {
      let currentLetter = alphabet[i].toLowerCase();
      let currentLetterContainer = {
        [`letter${alphabet[i]}`]: document.getElementById(
          `${alphabet[i]}-container`
        ),
      };
      alphabetLettersArray.push(currentLetterContainer);
      if (correctLetters.includes(currentLetter)) {
        alphabetLettersArray[i][`letter${alphabet[i]}`].style.color = "green";
      }

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
            // name={alphabet[i]}
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
      dispatch(newStrikeActionCreator({ strikes: currentStrikes }));
      dispatch(
        updateIncorrectLettersActionCreator({
          incorrectLetters: incorrectLetter,
          emptyLetters: emptySpaceCount,
        })
      );
    } //when empty space filled with a letter
    if (emptyLettersRef.current) {
      emptyLettersRef.current = false;
      dispatch(
        updateCorrectLettersActionCreator({
          correctLetters: correctLetterToPush,
          emptyLetters: emptySpaceCount,
        })
      );
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
      changeColorOfChosenLetters();
    }
  }, [currentStrikes, emptyLetters, incorrectLetter]);
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
