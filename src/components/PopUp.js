import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

function PopUp(props) {
  const user = useSelector((state) => state.user);

  const { successMessage } = props;

  let navigate = useNavigate();

  const redirectsUserToGameOptionsOnLogin = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    console.log("in popup component");
  };

  useEffect(() => {
    if (user) {
      redirectsUserToGameOptionsOnLogin();
    } else {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log("in popup component");
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
      {user ? (
        <Typography>
          Welcome Back {user.username}! Redirecting you to user options...
        </Typography>
      ) : (
        <Typography>{successMessage}</Typography>
      )}
    </Box>
  );
}

export default PopUp;
