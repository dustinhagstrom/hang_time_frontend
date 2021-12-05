import { Button, Grid } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newStrikeActionCreator } from "../redux/strikeState";
import { updateCorrectLettersActionCreator } from "../redux/wordState";

function AlphabetButtons(props) {
  const { word, setCurrentStrikes, currentStrikes } = props;
  const user = useSelector((state) => state.user);
  const playerOne = useSelector((state) => state.playerOne);

  const dispatch = useDispatch();
  const [alphabetJSXArray, setAlphabetJSXArray] = useState([]);

  const resettingRef = useRef(false); //ref used to help track strikes.

  const styleButtonAfterItIsClicked = (e) => {
    e.target.disabled = true;
    e.target.style = "visibility: hidden";
  };

  const chosenLetter = (e) => {
    const clickedLetter = e.target.name;
    styleButtonAfterItIsClicked(e);
    if (word.includes(clickedLetter)) {
      //loop through word to populate letters.
      for (let i = 0; i < word.length; i++) {
        if (word[i] === clickedLetter) {
          // TODO hit the db for update.
          dispatch(
            updateCorrectLettersActionCreator({ correctLetters: clickedLetter })
          );
          break; //this prevents duplicate calls to reducer and db.
        }
      }
    } else {
      resettingRef.current = true;
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
    if (resettingRef.current) {
      resettingRef.current = false;
      dispatch(newStrikeActionCreator({ strikes: currentStrikes }));
    }
    generatesTheAlphabet();
  }, [currentStrikes]);
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
