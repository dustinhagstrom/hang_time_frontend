import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const user = useSelector((state) => state.user);

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
        {user && user.username ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </Box>
    </Box>
  );
}

export default Header;
