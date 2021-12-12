import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Opponent(props) {
  const { gameID } = props;

  const user = useSelector((state) => state.user);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  const [opponent, setOpponent] = useState("Waiting for Opponent to join...");

  useEffect(() => {
    if (user && playerOne && playerTwo) {
      user.username === playerOne.username
        ? setOpponent(playerTwo)
        : setOpponent(playerOne);
    }
  }, []);

  return (
    <Box>
      <Typography>
        {typeof opponent === "object" ? opponent.username : opponent}
      </Typography>
      <Typography>Your Session ID:</Typography>
      <Typography>{gameID}</Typography>
    </Box>
  );
}

export default Opponent;
