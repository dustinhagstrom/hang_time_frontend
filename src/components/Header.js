import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <Box>
      <Box>logo</Box>
      <Box>
        <Typography>hi</Typography>
      </Box>
      <Box>Login</Box>
    </Box>
  );
}

export default Header;
