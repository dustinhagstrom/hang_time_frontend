import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logInActionCreator } from "../redux/userState";

import Home from "../pages/HomePage";

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    Cookies.remove("user");
    dispatch(logInActionCreator(null));
  }, []);

  return <Home />;
}

export default Logout;
