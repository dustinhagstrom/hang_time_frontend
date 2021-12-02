import Cookies from "js-cookie";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logInActionCreator } from "../redux/userState";

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //write the logic for user being logged in within header component b/c header persists throughout the application. put in a use effect to handle a reload. will have to use jwt decode in future when I have backend.

  const loggedInUser = () => {
    const userCookieExists = Cookies.get("user");
    if (userCookieExists) {
      const userIsLoggedIn = JSON.parse(Cookies.get("user"));
      dispatch(logInActionCreator(userIsLoggedIn));
    } else {
      dispatch(logInActionCreator(null));
    }
  };

  //write a useEffect to login the user whenever there is a page reload.
  useEffect(() => {
    loggedInUser();
  }, []);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-evenly", margin: "10px" }}
    >
      <Box>
        <Link to="/">logo</Link>
      </Box>
      <Box>
        <Typography>Hang Time</Typography>
      </Box>
      <Box>
        {user ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </Box>
    </Box>
  );
}

export default Header;
