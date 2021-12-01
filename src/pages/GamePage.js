import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import Hang from "../components/Hang";
import Layout from "../components/Layout";
import Opponent from "../components/Opponent";
import PopUp from "../components/PopUp";
import Strikes from "../components/Strikes";
import Word from "../components/Word";

function Game() {
  const strikes = useSelector((state) => state.strikes);

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          minHeight: "70vh",
        }}
      >
        {strikes !== 6 ? (
          <>
            <Opponent />
            <Box>
              <Hang />
              <Word />
            </Box>
            <Strikes />
          </>
        ) : (
          <>
            <Hang />
            <Strikes />
            <PopUp />
          </>
        )}
      </Box>
    </Layout>
  );
}

export default Game;
