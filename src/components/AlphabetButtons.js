import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function AlphabetButtons() {
  const user = useSelector((state) => state.user);
  const playerOne = useSelector((state) => state.playerOne);
  const wordObj = useSelector((state) => state.wordBank);

  const [word, setWord] = useState("");
  const [emptyLetters, setEmptyLetters] = useState(0);

  const [alphabetJSXArray, setAlphabetJSXArray] = useState([]);

  const chosenLetter = (e) => {
    const clickedLetter = e.target.name.toLowerCase();
    if (word.includes(clickedLetter)) {
      console.log("the game word includes this letter");
      // populate that letter on the gamepage
      // update empty letters to subtract spaces
      // that are filled with letters.
    } else {
      // add a strike,
    }

    console.log(e.target.name);
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
    generatesTheAlphabet();
    setWord(wordObj.word);
  }, [word]);
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
