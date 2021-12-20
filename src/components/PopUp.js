import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosErrorMessage } from "../Axios";
import {
  deleteWordOnGameOverCondition,
  editWordOnGameOverCondition,
} from "../Data";
import UserInputFields from "../hooks/userInputFields";
import { usePusher } from "../PusherContext";

const WelcomeUser = () => {
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
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography>
        Welcome Back {user.username}! Redirecting you to user options...
      </Typography>
    </Box>
  );
};

const GameOver = (props) => {
  const pusher = usePusher();

  const [
    gameWord,
    gameWordOnChange,
    gameWordError,
    gameWordErrorMessage,
    gameWordIsDisabled,
    gameWordClearInput,
  ] = UserInputFields("Word");

  const { playerOneWins, playerTwoWins } = props;

  const wordBank = useSelector((state) => state.wordBank);
  const user = useSelector((state) => state.user);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const isPlayerOne =
    user && playerOne && user.username === playerOne.username ? true : false;
  const gameID = wordBank.gameID;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(wordBank);
  console.log(gameID);

  const repeatAnotherGame = () => {
    const newWordBank = {
      ...wordBank,
      word: gameWord.toUpperCase(),
      emptyLetters: gameWord.length,
    };
    gameWordClearInput();
    editWordOnGameOverCondition(newWordBank).catch((e) => axiosErrorMessage(e));
  };

  const closeTheSession = () => {
    deleteWordOnGameOverCondition({ gameID: gameID })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => axiosErrorMessage(e));
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
            value={gameWord}
            label={gameWordError ? gameWordErrorMessage : ""}
            error={gameWordError}
            color={gameWordError ? "error" : "success"}
            onChange={gameWordOnChange}
            autoFocus
          ></TextField>
          <Button onClick={repeatAnotherGame} disabled={gameWordIsDisabled}>
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
