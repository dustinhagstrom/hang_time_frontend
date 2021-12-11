import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addWordToDB } from "../Data";
import { setPlayerOneActionCreator } from "../redux/playerState";
import { newWordActionCreator } from "../redux/wordState";
import Layout from "./Layout";

function HostSession() {
  const user = useSelector((state) => state.user);
  const [inputWord, setInputWord] = useState("");
  const [inputWordLength, setInputWordLength] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [sessionID, setSessionID] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitWord = (e) => {
    //used in new game (popup.js)
    setIsDisabled(true);
    const wordBank = {
      word: inputWord.toUpperCase(),
      emptyLetters: inputWordLength,
      userEmail: user.email,
    };

    addWordToDB(wordBank)
      .then((res) => {
        console.log(res.data.payload);
        const { payload, message } = res.data;
        dispatch(newWordActionCreator(payload));
        dispatch(setPlayerOneActionCreator(user));
        setSessionID(payload.gameID);
      })
      .catch((e) => {
        console.log(e.message);
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
          value={inputWord}
          onChange={(e) => {
            setInputWord(e.target.value);
            setInputWordLength(e.target.value.length);
          }}
        ></TextField>
        <Button onClick={submitWord} disabled={isDisabled}>
          Submit Word
        </Button>
        {sessionID ? (
          <Box>
            <Typography>Your Session ID:</Typography>
            <Typography>{sessionID}</Typography>
            <Button component={Link} to="/game">
              ---- Go to Game ----
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Layout>
  );
}
export default HostSession;
