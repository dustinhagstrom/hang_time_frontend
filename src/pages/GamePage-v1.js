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
  newWordActionCreator,
  updateCorrectLettersActionCreator,
  updateIncorrectLettersActionCreator,
} from "../redux/wordState";

const PlayerScreen = () => {
  const user = useSelector((state) => state.user);
  const playerTwo = useSelector((state) => state.playerTwo);
  const playerOne = useSelector((state) => state.playerOne);
  const wordObj = useSelector((state) => state.wordBank);

  const [gameID, setGameID] = useState(wordObj.gameID); //CHANNEL NAME
  const pusher = usePusher(); //EXTRACT PUSHER (value) from closest provider
  const channel = pusher.subscribe(gameID); //PUSHER CHANNEL SUBSCRIPTION

  const dispatch = useDispatch();

  const initialWord = wordObj.word;
  const initialStrikes = wordObj.strikes;
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
    console.log("useEffect: ", currentStrikes, emptyLetters, wordObj);
    if (user && playerOne && user.username === playerOne.username) {
      //P2 joins game
      function p2JoinHandler(data) {
        console.log(data.payload);
        dispatch(setPlayerTwoActionCreator(data.payload));
      }
      //correct Letter guessed
      function correctLetterEventHandler(data) {
        let correctArray = data.payload.correctLetters;
        dispatch(
          updateCorrectLettersActionCreator({
            wordBank: wordObj, //intentionally send this "old" value
            correctLetters: correctArray[correctArray.length - 1],
            emptyLetters: data.payload.emptyLetters,
          })
        );
        setLetters({
          emptyLetters: data.payload.emptyLetters,
          filledLetter: filledLetter,
        });
      }
      //incorrect Letter guessed
      function incorrectLetterEventHandler(data) {
        let incorrectArray = data.payload.incorrectLetters;
        dispatch(
          updateIncorrectLettersActionCreator({
            wordBank: wordObj,
            incorrectLetters: incorrectArray[incorrectArray.length - 1],
            strikes: data.payload.strikes,
          })
        );
        setCurrentStrikes(data.payload.strikes);
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
    }
    if (user && playerTwo && user.username === playerTwo.username) {
      //new word at new game
      function gameOverNewWordEventHandler(data) {
        console.log(data.payload);
        dispatch(newWordActionCreator(data.payload));
        setGameOver(false);
        setWord(data.payload.word);
        setDisableButtonsOnGameOver(false);
      }

      channel.bind("gameOverNewWordEvent", gameOverNewWordEventHandler);
      return () => {
        channel.unbind("gameOverNewWordEvent", gameOverNewWordEventHandler);
      };
    }
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
  console.log("game component which returns provider wrapping children.");
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
