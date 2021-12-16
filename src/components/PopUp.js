import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosErrorMessage } from "../Axios";
import { editWordOnGameOverCondition } from "../Data";
import { usePusher } from "../PusherContext";
import {
  setPlayerOneActionCreator,
  setPlayerTwoActionCreator,
} from "../redux/playerState";
import { newWordActionCreator } from "../redux/wordState";

const WelcomeUser = (props) => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  //below func used when user logs on
  const redirectsUserToGameOptionsOnLogin = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    redirectsUserToGameOptionsOnLogin();
  }, []);

  return (
    <>
      <Typography>
        Welcome Back {user.username}! Redirecting you to user options...
      </Typography>
    </>
  );
};

const GameOver = (props) => {
  const pusher = usePusher();

  const { playerOneWins, playerTwoWins } = props;

  const wordBank = useSelector((state) => state.wordBank);
  const user = useSelector((state) => state.user);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const isPlayerOne =
    user && playerOne && user.username === playerOne.username ? true : false;
  const gameID = wordBank.gameID;
  const [inputWord, setInputWord] = useState("");
  const [inputWordLength, setInputWordLength] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const repeatAnotherGame = () => {
    const wordToHitDB = {
      word: inputWord.toUpperCase(),
      emptyLetters: inputWordLength,
      gameID,
    };
    const wordToDispatch = {
      ...wordToHitDB,
      correctLetters: [],
      incorrectLetters: [],
      strikes: 0,
    };
    dispatch(newWordActionCreator(wordToDispatch));
    editWordOnGameOverCondition(wordToHitDB).catch((e) => {
      axiosErrorMessage(e);
    });
  };

  const closeTheSession = () => {
    dispatch(setPlayerOneActionCreator(null));
    dispatch(setPlayerTwoActionCreator(null));
    dispatch(newWordActionCreator(null));
    pusher.disconnect();
    navigate("/");
  };
  return (
    <>
      <Typography>Game Over</Typography>
      <Typography>The Winner :</Typography>
      <Typography>
        {playerOneWins ? playerOne.username : playerTwo.username}
      </Typography>
      {isPlayerOne ? (
        <>
          <Typography>Please enter a word below</Typography>
          <TextField
            sx={{ width: "50%" }}
            value={inputWord}
            onChange={(e) => {
              setInputWord(e.target.value);
              setInputWordLength(e.target.value.length);
            }}
          ></TextField>
          <Button
            onClick={repeatAnotherGame}
            disabled={inputWordLength > 0 ? false : true}
          >
            Play Again?
          </Button>
        </>
      ) : (
        <Typography>Waiting on {playerOne.username}...</Typography>
      )}
      <Button onClick={closeTheSession}>Close The Session</Button>
    </>
  );
};

function PopUp(props) {
  const { playerOneWins, playerTwoWins, appCondition } = props;

  const renderComponentsSwitchCase = (condition) => {
    switch (condition) {
      case "WelcomeUser":
        return <WelcomeUser />;
      case "GameOver":
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "absolute",
              margin: " 25% auto",
              background: "hsl(89, 43%, 51%)",
            }}
          >
            <GameOver
              playerOneWins={playerOneWins}
              playerTwoWins={playerTwoWins}
            />
          </Box>
        );
    }
  };

  return <>{renderComponentsSwitchCase(appCondition)}</>;
}

export default PopUp;
