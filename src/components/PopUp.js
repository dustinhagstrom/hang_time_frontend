import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWordToDB, updateStrikesInDB } from "../Data";
import Home from "../pages/HomePage";
import {
  setPlayerOneActionCreator,
  setPlayerTwoActionCreator,
} from "../redux/playerState";
import { newStrikeActionCreator } from "../redux/strikeState";
import { newWordActionCreator } from "../redux/wordState";

const WelcomeUser = (props) => {
  const { user } = props;

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
  const { gameOver, setGameOver, setWord, playerOne, playerTwo, user } = props;

  const [inputWord, setInputWord] = useState("");
  const [inputWordLength, setInputWordLength] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const repeatAnotherGame = () => {
    addWordToDB(inputWord.toUpperCase())
      .then((res) => {
        const { wordBank, message } = res;
        console.log(wordBank);
        dispatch(newWordActionCreator(wordBank));
      })
      .catch((e) => {
        console.log(e.message);
      });
    dispatch(newStrikeActionCreator({ strikes: 0 }));
    updateStrikesInDB(0)
      .then((response) => console.log(response.message))
      .catch((error) => console.log(error));
    setGameOver(false);
    setWord(inputWord);
  };

  const closeTheSession = () => {
    dispatch(setPlayerOneActionCreator(null));
    dispatch(setPlayerTwoActionCreator(null));
    dispatch(newStrikeActionCreator({ strikes: 0 }));
    dispatch(newWordActionCreator(null));
    navigate("/");
  };
  return (
    <>
      <Typography>Game Over</Typography>
      {playerOne && playerOne.username === user.username ? (
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
        <Typography>Waiting on Player One...</Typography>
      )}
      <Button onClick={closeTheSession}>Close The Session</Button>
    </>
  );
};

const InputNewWord = (props) => {
  const { setWord } = props;
  //TODO: if a new game is started then this popup appears to allow
  // playerOne to put a new word into the game.

  return <div></div>;
};

function PopUp(props) {
  const { gameOver, setGameOver, setWord, appCondition } = props;
  const user = useSelector((state) => state.user);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  console.log(appCondition);

  // const strikes = useSelector((state) => state.strikes);

  const renderComponentsSwitchCase = (condition) => {
    switch (condition) {
      case "WelcomeUser":
        return <WelcomeUser user={user} />;
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
              gameOver={gameOver}
              setGameOver={setGameOver}
              setWord={setWord}
              playerOne={playerOne}
              playerTwo={playerTwo}
              user={user}
            />
          </Box>
        );
      case "InputNewGameWord":
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
              gameOver={gameOver}
              setGameOver={setGameOver}
              setWord={setWord}
            />
          </Box>
        );
    }
  };

  return <>{renderComponentsSwitchCase(appCondition)}</>;
}

export default PopUp;
