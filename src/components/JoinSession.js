import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "./Layout";

function JoinSession() {
  const [sessionID, setSessionID] = useState();

  const navigate = useNavigate();

  const joinSession = () => {
    console.log("you joined a session.");
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
        <Button onClick={joinSession}>Join Session</Button>
      </Box>
    </Layout>
  );
}

export default JoinSession;
