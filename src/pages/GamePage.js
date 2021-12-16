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
  setPlayerTwoGuessActionCreator,
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

  const dispatch = useDispatch();

  const word = wordBank.word;
  const strikes = wordBank.strikes;
  const emptyLetters = wordBank.emptyLetters;

  const isPlayerOne =
    user && playerOne && user.username === playerOne.username ? true : false;
  const playerOneWins = strikes >= 6 ? true : false;
  const playerTwoWins = emptyLetters === 0 ? true : false;
  const gameOver = playerOneWins || playerTwoWins ? true : false;

  //P2 joins game
  function p2JoinHandler(data) {
    if (isPlayerOne) {
      console.log(data.payload);
      dispatch(setPlayerTwoActionCreator(data.payload));
    }
  }

  function p2GuessHandler(data) {
    console.log(data.payload);
    dispatch(setPlayerTwoGuessActionCreator(data.payload));
  }

  //new word at new game
  function gameOverNewWordEventHandler(data) {
    console.log(data.payload);
    dispatch(newWordActionCreator(data.payload));
  }

  // subscribe and unsubscribe to pusher
  useEffect(() => {
    const channel = pusher.subscribe(gameID); //PUSHER CHANNEL SUBSCRIPTION

    channel.bind("P2joinEvent", p2JoinHandler);
    channel.bind("P2GuessEvent", p2GuessHandler);
    channel.bind("gameOverNewWordEvent", gameOverNewWordEventHandler);

    return () => {
      channel.unbind("P2joinEvent", p2JoinHandler);
      channel.unbind("P2GuessEvent", p2GuessHandler);
      channel.unbind("gameOverNewWordEvent", gameOverNewWordEventHandler);
    };
  }, []);

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
