import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box>
        <Header />
        {children}
      </Box>
    </>
  );
};

export default Layout;
