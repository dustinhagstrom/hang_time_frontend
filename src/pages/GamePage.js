import { Box } from "@mui/system";
import React from "react";
import Hang from "../components/Hang";
import Layout from "../components/Layout";
import Opponent from "../components/Opponent";
import Strikes from "../components/Strikes";
import Word from "../components/Word";

function Game() {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          minHeight: "60vh",
        }}
      >
        <Opponent />
        <Hang />
        <Strikes />
      </Box>
      <Word />
    </Layout>
  );
}

export default Game;
