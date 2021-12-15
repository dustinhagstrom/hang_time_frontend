import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setPlayerOneActionCreator,
  setPlayerTwoActionCreator,
} from "../redux/playerState";

import Home from "../pages/HomePage";
import { newWordActionCreator } from "../redux/wordState";
import { logInActionCreator } from "../redux/userState";

//reset redux stores and return home component
function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logInActionCreator(null));
    dispatch(setPlayerOneActionCreator(null));
    dispatch(setPlayerTwoActionCreator(null));
    dispatch(newWordActionCreator(null));
  }, []);

  return <Home />;
}

export default Logout;
