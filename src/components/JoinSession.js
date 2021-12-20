import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { axiosErrorMessage } from "../Axios";
import { addPlayerTwoDataToWord } from "../Data";
import UserInputFields from "../hooks/userInputFields";
import {
  setPlayerOneActionCreator,
  setPlayerTwoActionCreator,
} from "../redux/playerState";
import { newWordActionCreator } from "../redux/wordState";
import Layout from "./Layout";

function JoinSession() {
  const user = useSelector((state) => state.user);

  const [
    gameID,
    gameIDOnChange,
    gameIDError,
    gameIDErrorMessage,
    gameIDIsDisabled,
    gameIDClearInput,
  ] = UserInputFields("Game Code");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GoToGameAsPlayerTwo = () => {
    const { email } = user;
    addPlayerTwoDataToWord(email, gameID)
      .then((res) => {
        const { message, payload } = res.data;

        dispatch(newWordActionCreator(payload.gameWord));
        dispatch(setPlayerOneActionCreator(payload.foundPlayerOne));
        dispatch(setPlayerTwoActionCreator(user));
        navigate("/game");
      })
      .catch((e) => {
        axiosErrorMessage(e);
      });
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Please enter Session information below</Typography>
        <TextField
          sx={{ width: "50%" }}
          value={gameID.toUpperCase()}
          onChange={gameIDOnChange}
          label={gameIDError ? gameIDErrorMessage : ""}
          error={gameIDError}
          color={gameIDError ? "error" : "success"}
        ></TextField>
        <Button onClick={GoToGameAsPlayerTwo} disabled={gameIDIsDisabled}>
          Join Session
        </Button>
      </Box>
    </Layout>
  );
}

export default JoinSession;
