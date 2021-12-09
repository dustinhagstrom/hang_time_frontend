import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addWordToDB } from "../Data";
import { setPlayerOneActionCreator } from "../redux/playerState";
import { newWordActionCreator } from "../redux/wordState";
import Layout from "./Layout";

function WordInput() {
  const user = useSelector((state) => state.user);
  const [inputWord, setInputWord] = useState("");
  const [inputWordLength, setInputWordLength] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitWord = () => {
    addWordToDB(inputWord.toUpperCase())
      .then((res) => {
        const { wordBank, message } = res;
        console.log(wordBank);
        dispatch(newWordActionCreator(wordBank));
        dispatch(setPlayerOneActionCreator(user));
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
        <Button onClick={submitWord}>Submit Word</Button>
      </Box>
    </Layout>
  );
}
export default WordInput;
