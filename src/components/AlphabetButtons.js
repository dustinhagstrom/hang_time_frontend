import { Button, Grid } from "@mui/material";
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
  } = props;

  const user = useSelector((state) => state.user);
  const playerOne = useSelector((state) => state.playerOne);

  const dispatch = useDispatch();
  const [alphabetJSXArray, setAlphabetJSXArray] = useState([]);

  const strikeRef = useRef(false); //ref used to help track strikes.
  const emptyLettersRef = useRef(false); //empty spaces ref.
  const incorrectLettersRef = useRef(false);

  //the following let's are used to store values from chosenLetter func below.
  let incorrectLetterToPush = incorrectLetter;
  let correctLetterToPush = filledLetter;
  let emptySpaceCount = emptyLetters;

  const styleButtonAfterItIsClicked = (e) => {
    e.target.disabled = true;
    e.target.style = "visibility: hidden";
  };

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

  const generatesTheAlphabet = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let alphabetElementsArray = [];
    for (let i = 0; i < alphabet.length; i++) {
      alphabetElementsArray.push(
        <Grid item xs={2} key={alphabet[i] + "-letter-container"} px={0}>
          <Button
            variant="text"
            onClick={chosenLetter}
            name={alphabet[i]}
            sx={{ minWidth: "32px", padding: "0" }}
            px={6}
            disabled={user === playerOne ? true : false}
          >
            {alphabet[i]}
          </Button>
        </Grid>
      );
    }
    setAlphabetJSXArray(alphabetElementsArray);
  };

  useEffect(() => {
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
    }
    if (emptyLettersRef.current) {
      emptyLettersRef.current = false;
      dispatch(
        updateCorrectLettersActionCreator({
          correctLetters: correctLetterToPush,
          emptyLetters: emptySpaceCount,
        })
      );
    }

    generatesTheAlphabet();
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
