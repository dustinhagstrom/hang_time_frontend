import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AlphabetButtons from "../components/AlphabetButtons";
import Hang from "../components/Hang";
import Layout from "../components/Layout";
import Opponent from "../components/Opponent";
import PopUp from "../components/PopUp";
import Strikes from "../components/Strikes";
import Word from "../components/Word";

const PlayerScreen = () => {
  const strikes = useSelector((state) => state.strikes);
  const user = useSelector((state) => state.user);
  const playerTwo = useSelector((state) => state.playerTwo);
  const playerOne = useSelector((state) => state.playerOne);

  // i need to store the word (in an array? letter by letter maybe)
  // set empty letters to the length of the word/array.
  // if a letter is guessed correctly then subtract one from empty letters
  // if a letter is guessed incorrectly then add a strike.
  // if strikes === 6 -> game over. player one wins
  // if emptyLetters === 0 -> game over. player two wins
  const [emptyLetters, setEmptyLetters] = useState();
  const [gameOver, setGameOver] = useState(false);

  // possibly use a setTimeout to render the popup after game over.
  const gameOverCondition = () => {
    if (strikes === 6) {
    }
  };

  return (
    <>
      {/* {gameOver ? (
        <>
          <PopUp />
        </>
      ) : ( */}
      <>
        <Box>
          <Opponent opponent={""} />
          <Hang />
          <Word />
        </Box>
        <Box sx={{ maxWidth: "300px" }}>
          <Strikes />
          <AlphabetButtons />
        </Box>
      </>
    </>
  );
};

function Game() {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          minHeight: "70vh",
        }}
      >
        <PlayerScreen />
      </Box>
    </Layout>
  );
}

export default Game;
