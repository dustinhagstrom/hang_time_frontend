import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setPlayerTwoActionCreator } from "../redux/playerState";
import Layout from "./Layout";

function JoinSession() {
  const user = useSelector((state) => state.user);

  const [sessionID, setSessionID] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GoToGameAsPlayerTwo = () => {
    dispatch(setPlayerTwoActionCreator(user));
    navigate("/game");
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
          onChange={(e) => setSessionID(e.target.value)}
        ></TextField>
        <Button onClick={GoToGameAsPlayerTwo}>Join Session</Button>
      </Box>
    </Layout>
  );
}

export default JoinSession;
