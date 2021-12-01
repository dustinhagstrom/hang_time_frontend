import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { addWordToDB } from "../Data";
import { newWordActionCreator } from "../redux/wordState";
import Layout from "./Layout";

function HostSession() {
  const [inputWord, setInputWord] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitWord = () => {
    addWordToDB(inputWord)
      .then((response) => {
        console.log(response.message);
        dispatch(newWordActionCreator(inputWord));
        navigate("/game");
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
          onChange={(e) => setInputWord(e.target.value)}
        ></TextField>
        <Button onClick={submitWord}>Submit Word</Button>
      </Box>
    </Layout>
  );
}
export default HostSession;
