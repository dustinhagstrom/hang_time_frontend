import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { axiosErrorMessage } from "../Axios";
import { addWordToDB } from "../Data";
import UserInputFields from "../hooks/userInputFields";
import { setPlayerOneActionCreator } from "../redux/playerState";
import { newWordActionCreator } from "../redux/wordState";
import Layout from "./Layout";

function HostSession() {
  const user = useSelector((state) => state.user);

  const [
    gameWord,
    gameWordOnChange,
    gameWordError,
    gameWordErrorMessage,
    gameWordIsDisabled,
    gameWordClearInput,
  ] = UserInputFields("Word");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitWord = (e) => {
    const wordBank = {
      word: gameWord.toUpperCase(),
      emptyLetters: gameWord.length,
      userEmail: user.email,
    };

    gameWordClearInput();
    addWordToDB(wordBank)
      .then((res) => {
        const { payload, message } = res.data;
        dispatch(newWordActionCreator(payload));
        dispatch(setPlayerOneActionCreator(user));
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
        <Typography>Please enter a word below</Typography>
        <TextField
          sx={{ width: "50%" }}
          value={gameWord}
          label={gameWordError ? gameWordErrorMessage : ""}
          error={gameWordError}
          color={gameWordError ? "error" : "success"}
          onChange={gameWordOnChange}
        ></TextField>
        <Button onClick={submitWord} disabled={gameWordIsDisabled}>
          Submit Word
        </Button>
      </Box>
    </Layout>
  );
}
export default HostSession;
