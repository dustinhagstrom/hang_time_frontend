import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const wordBank = useSelector((state) => state.wordBank);

  const gameID = wordBank.gameID; //CHANNEL NAME
  const pusher = usePusher(); //EXTRACT PUSHER (value) from closest provider
  const channel = pusher.subscribe(gameID); //PUSHER CHANNEL SUBSCRIPTION

  const dispatch = useDispatch();

  const word = wordBank.word;
  const strikes = wordBank.strikes;
  const emptyLetters = wordBank.emptyLetters;

  const isPlayerOne =
    user && playerOne && user.username === playerOne.username ? true : false;
  const playerOneWins = strikes >= 6 ? true : false;
  const playerTwoWins = emptyLetters === 0 ? true : false;
  const gameOver = playerOneWins || playerTwoWins ? true : false;

  //PUSHER USE EFFECT
  useEffect(() => {
    console.log("useEffect: ", strikes, emptyLetters, wordBank);
    if (isPlayerOne) {
      //P2 joins game
      function p2JoinHandler(data) {
        console.log(data.payload);
        dispatch(setPlayerTwoActionCreator(data.payload));
      }
      //correct Letter guessed
      function correctLetterEventHandler(data) {
        let correctArray = data.payload.correctLetters;
        let clickedLetter = correctArray[correctArray.length - 1];
        dispatch(
          updateCorrectLettersActionCreator({
            wordBank: wordBank,
            correctLetters: clickedLetter,
            emptyLetters: data.payload.emptyLetters,
          })
        );
      }
      //incorrect Letter guessed
      function incorrectLetterEventHandler(data) {
        let incorrectArray = data.payload.incorrectLetters;
        let clickedLetter = incorrectArray[incorrectArray.length - 1];
        dispatch(
          updateIncorrectLettersActionCreator({
            wordBank,
            incorrectLetters: clickedLetter,
            strikes: data.payload.strikes,
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
    }
    if (!isPlayerOne) {
      //new word at new game
      function gameOverNewWordEventHandler(data) {
        console.log(data.payload);
        dispatch(newWordActionCreator(data.payload));
      }

      channel.bind("gameOverNewWordEvent", gameOverNewWordEventHandler);
      return () => {
        channel.unbind("gameOverNewWordEvent", gameOverNewWordEventHandler);
      };
    }
  }, [strikes, emptyLetters, pusher, wordBank]); //might have to change wordOBJ

  return (
    <>
      {gameOver ? (
        <PopUp
          appCondition={"GameOver"}
          playerOneWins={playerOneWins}
          playerTwoWins={playerTwoWins}
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
        <AlphabetButtons gameOver={gameOver} />
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
