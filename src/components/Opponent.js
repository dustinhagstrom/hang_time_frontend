import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

function Opponent() {
  const user = useSelector((state) => state.user);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const gameID = useSelector((state) => state.wordBank.gameID);

  const isPlayerOne =
    user && playerOne && user.username === playerOne.username ? true : false;
  const hasPlayerTwoJoinedGame = playerTwo && playerTwo.username ? true : false;
  const opponent =
    isPlayerOne && hasPlayerTwoJoinedGame
      ? playerTwo.username
      : playerOne.username;
  return (
    <Box>
      <Typography>{opponent}</Typography>
      <Typography>Your Session ID:</Typography>
      <Typography>{gameID}</Typography>
    </Box>
  );
}

export default Opponent;
