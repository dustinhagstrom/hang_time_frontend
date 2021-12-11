import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Layout from "./Layout";

import {
  setPlayerOneActionCreator,
  setPlayerTwoActionCreator,
} from "../redux/playerState";
import { addPlayerTwoDataToWord, axiosErrorMessage } from "../Data";
import { newWordActionCreator } from "../redux/wordState";

function JoinSession() {
  const user = useSelector((state) => state.user);

  const [sessionID, setSessionID] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GoToGameAsPlayerTwo = () => {
    const { email } = user;
    addPlayerTwoDataToWord(email, sessionID)
      .then((res) => {
        const { message, payload } = res.data;

        console.log(payload);
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
          value={sessionID}
          onChange={(e) => setSessionID(e.target.value.toUpperCase())}
        ></TextField>
        <Button onClick={GoToGameAsPlayerTwo}>Join Session</Button>
      </Box>
    </Layout>
  );
}

export default JoinSession;
