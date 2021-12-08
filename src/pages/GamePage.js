import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AlphabetButtons from "../components/AlphabetButtons";
import Hang from "../components/Hang";
import Layout from "../components/Layout";
import Opponent from "../components/Opponent";
import PopUp from "../components/PopUp";
import Strikes from "../components/Strikes";
import Word from "../components/Word";

const PlayerScreen = () => {
  const strikesObj = useSelector((state) => state.strikes);
  const user = useSelector((state) => state.user);
  const playerTwo = useSelector((state) => state.playerTwo);
  const playerOne = useSelector((state) => state.playerOne);
  const wordObj = useSelector((state) => state.wordBank);
  const initialWord = wordObj.word;
  const initialStrikes = strikesObj.strikes;
  const initialEmptyLetters = wordObj.emptyLetters;
  console.log("playerScreen re-render");
  const dispatch = useDispatch();

  const [word, setWord] = useState(initialWord);
  const [currentStrikes, setCurrentStrikes] = useState(initialStrikes);
  //filledLetter initial state intentionally omitted
  const [{ emptyLetters, filledLetter }, setLetters] = useState({
    emptyLetters: initialEmptyLetters,
  });
  //incorrectLetter initial state intentionally omitted
  const [incorrectLetter, setIncorrectLetter] = useState();

  // if strikes === 6 -> game over. player one wins
  // if emptyLetters === 0 -> game over. player two wins
  const [gameOver, setGameOver] = useState(false);

  // possibly use a setTimeout to render the popup after game over.
  const gameOverCondition = () => {
    if (currentStrikes >= 6) {
      //player one wins
    }
    if (emptyLetters === 0) {
      //player two wins
    }
  };

  return (
    <>
      {/* {gameOver ? (
        <>
          <PopUp />
        </>
      ) : ( */}
      <Opponent />
      <Box>
        <Hang />
        <Word word={word} />
      </Box>
      <Box sx={{ maxWidth: "300px" }}>
        <Strikes />
        <AlphabetButtons
          word={word}
          setCurrentStrikes={setCurrentStrikes}
          currentStrikes={currentStrikes}
          setLetters={setLetters}
          emptyLetters={emptyLetters}
          filledLetter={filledLetter}
          setIncorrectLetter={setIncorrectLetter}
          incorrectLetter={incorrectLetter}
          user={user}
          playerOne={playerOne}
          playerTwo={playerTwo}
        />
      </Box>
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
