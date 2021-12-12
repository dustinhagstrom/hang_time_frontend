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
import { setPlayerTwoActionCreator } from "../redux/playerState";
import {
  updateCorrectLettersActionCreator,
  updateIncorrectLettersActionCreator,
} from "../redux/wordState";

const PlayerScreen = () => {
  const strikesObj = useSelector((state) => state.strikes);
  const user = useSelector((state) => state.user);
  const playerTwo = useSelector((state) => state.playerTwo);
  const playerOne = useSelector((state) => state.playerOne);
  const wordObj = useSelector((state) => state.wordBank);

  const [gameID, setGameID] = useState(wordObj.gameID); //CHANNEL NAME
  const pusher = usePusher(); //EXTRACT PUSHER (value) from closest provider
  const channel = pusher.subscribe(gameID); //PUSHER CHANNEL SUBSCRIPTION

  const dispatch = useDispatch();

  const initialWord = wordObj.word;
  const initialStrikes = strikesObj.strikes;
  const initialEmptyLetters = wordObj.emptyLetters;
  console.log("playerScreen re-render");

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

  //PUSHER USE EFFECT
  useEffect(() => {
    //P2 joins game
    function p2JoinHandler(data) {
      console.log(data.payload);
      dispatch(setPlayerTwoActionCreator(data.payload));
    }
    //correct Letter guessed
    function correctLetterEventHandler(data) {
      dispatch(
        updateCorrectLettersActionCreator({
          wordBank: wordObj,
          correctLetters: data.payload.correctLetters,
          emptyLetters: data.payload.emptyLetters,
        })
      );
    }
    //incorrect Letter guessed
    function incorrectLetterEventHandler(data) {
      dispatch(
        updateIncorrectLettersActionCreator({
          wordBank: wordObj,
          incorrectLetters: data.payload.incorrectLetters,
        })
      );
    }

    channel.bind("P2joinEvent", p2JoinHandler);
    channel.bind("correctLetterEvent", correctLetterEventHandler);
    channel.bind("incorrectLetterEvent", incorrectLetterEventHandler);

    return () => {
      //this is cleanup func
      channel.unbind("P2joinEvent", p2JoinHandler);
      channel.unbind("correctLetterEvent", correctLetterEventHandler);
      channel.unbind("incorrectLetterEvent", incorrectLetterEventHandler);
    };
  }, [currentStrikes, emptyLetters, pusher, wordObj]); //might have to change wordOBJ

  useEffect(() => {
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
      <Opponent gameID={gameID} />
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
          gameID={gameID}
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
