import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateStrikesInDB } from "../Data";
import Home from "../pages/HomePage";
import { newStrikeActionCreator } from "../redux/wordState";

function PopUp(props) {
  const user = useSelector((state) => state.user);
  const strikes = useSelector((state) => state.strikes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //below func used when user logs on
  const redirectsUserToGameOptionsOnLogin = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  //below func used when gameover and new game button clicked.
  const repeatAnotherGame = () => {
    const resetStrikes = { strikes: 0 };
    dispatch(newStrikeActionCreator(resetStrikes));
    updateStrikesInDB(resetStrikes)
      .then((response) => console.log(response.message))
      .catch((error) => console.log(error));
    navigate("/game");
  };

  useEffect(() => {
    if (user && strikes !== 6) {
      redirectsUserToGameOptionsOnLogin();
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* first block is user on login, second is gameover page */}
      {user && strikes !== 6 ? (
        <Typography>
          Welcome Back {user.username}! Redirecting you to user options...
        </Typography>
      ) : (
        <>
          <Typography>Game Over</Typography>
          <Button onClick={repeatAnotherGame}>Play Again?</Button>
          <Button>Close The Session</Button>
        </>
      )}
    </Box>
  );
}

export default PopUp;
