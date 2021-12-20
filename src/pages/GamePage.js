import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlphabetButtons from "../components/AlphabetButtons";
import Hang from "../components/Hang";
import Layout from "../components/Layout";
import Opponent from "../components/Opponent";
import PopUp from "../components/PopUp";
import Strikes from "../components/Strikes";
import Word from "../components/Word";
import { PusherProvider, usePusher } from "../PusherContext";
import {
  setPlayerOneActionCreator,
  setPlayerTwoActionCreator,
} from "../redux/playerState";
import {
  newWordActionCreator,
  setPlayerTwoGuessActionCreator,
} from "../redux/wordState";

const PlayerScreen = () => {
  const user = useSelector((state) => state.user);
  const playerTwo = useSelector((state) => state.playerTwo);
  const playerOne = useSelector((state) => state.playerOne);
  const wordBank = useSelector((state) => state.wordBank);

  const gameID = wordBank.gameID; //CHANNEL NAME
  const pusher = usePusher(); //EXTRACT PUSHER (value) from closest provider

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(setPlayerTwoActionCreator(data.payload));
    }
  }
  //guess
  function p2GuessHandler(data) {
    dispatch(setPlayerTwoGuessActionCreator(data.payload));
  }

  //new word at new game
  function gameOverNewWordEventHandler(data) {
    dispatch(newWordActionCreator(data.payload));
  }

  //end of game, end session
  function gameOverEndSessionEventHandler(data) {
    navigate("/");
    dispatch(newWordActionCreator(null));
    dispatch(setPlayerOneActionCreator(null));
    dispatch(setPlayerTwoActionCreator(null));
  }

  // subscribe and unsubscribe to pusher
  useEffect(() => {
    const channel = pusher.subscribe(gameID); //PUSHER CHANNEL SUBSCRIPTION

    channel.bind("P2joinEvent", p2JoinHandler);
    channel.bind("P2GuessEvent", p2GuessHandler);
    channel.bind("gameOverNewWordEvent", gameOverNewWordEventHandler);
    channel.bind("EndSessionEvent", gameOverEndSessionEventHandler);

    return () => {
      channel.unbind("P2joinEvent", p2JoinHandler);
      channel.unbind("P2GuessEvent", p2GuessHandler);
      channel.unbind("gameOverNewWordEvent", gameOverNewWordEventHandler);
      channel.unbind("EndSessionEvent", gameOverEndSessionEventHandler);
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
