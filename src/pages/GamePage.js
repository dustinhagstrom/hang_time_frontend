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
import { PusherProvider, usePusher } from "../PusherContext";

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
  const pusher = usePusher();

  const [word, setWord] = useState(initialWord);
  const [currentStrikes, setCurrentStrikes] = useState(initialStrikes);
  //filledLetter initial state intentionally omitted
  const [{ emptyLetters, filledLetter }, setLetters] = useState({
    emptyLetters: initialEmptyLetters,
  });
  //incorrectLetter initial state intentionally omitted
  const [incorrectLetter, setIncorrectLetter] = useState();
  const [winner, setWinner] = useState("");
  const [disableButtonsOnGameOver, setDisableButtonsOnGameOver] =
    useState(false);
  const [gameID, setGameID] = useState(wordObj.gameID);

  // if strikes === 6 -> game over. player one wins
  // if emptyLetters === 0 -> game over. player two wins
  const [gameOver, setGameOver] = useState(false);

  // possibly use a setTimeout to render the popup after game over.
  const gameOverCondition = () => {
    if (currentStrikes >= 6) {
      //player one wins
      setGameOver(true);
      setWinner(playerOne.username);
      setDisableButtonsOnGameOver(true);
    }
    if (emptyLetters === 0) {
      //player two wins
      setGameOver(true);
      setWinner(playerTwo.username);
      setDisableButtonsOnGameOver(true);
    }
  };

  useEffect(() => {
    //data should include word data and strikes data

    function hangEventHandler(data) {
      //some logic to update stores
      console.log(data.payload);
    }
    const channel = pusher.subscribe(gameID);
    channel.bind("hangEvent", hangEventHandler);

    return () => {
      //this is cleanup func
      channel.unbind("hangEvent", hangEventHandler);
    };
  }, [currentStrikes, pusher, wordObj]); //might have to change wordOBJ

  useEffect(() => {
    // maybe some logic for gameover???
    gameOverCondition();
  }, [currentStrikes, emptyLetters]);

  return (
    <>
      {gameOver ? (
        <PopUp
          gameOver={gameOver}
          setGameOver={setGameOver}
          setWord={setWord}
          appCondition={"GameOver"}
        />
      ) : (
        <></>
      )}
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
          disableButtonsOnGameOver={disableButtonsOnGameOver}
        />
      </Box>
    </>
  );
};

function Game() {
  return (
    <PusherProvider>
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
    </PusherProvider>
  );
}

export default Game;
