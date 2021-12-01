import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addWordToDB } from "../Data";
import { newWordActionCreator } from "../redux/wordState";
import Layout from "./Layout";

function WordInput() {
  const [userInputWord, setUserInputWord] = useState("");
  //   const [successMessage, setSuccessMessage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitWordToDB = () => {
    addWordToDB(userInputWord)
      .then((response) => {
        console.log(response);
        const { message } = response;
        // setSuccessMessage(message);
        navigate("/game");
      })
      .catch((e) => {
        console.log("error: ", e);
        // setSuccessMessage(e.message);
      });
    dispatch(newWordActionCreator({ word: userInputWord }));
  };

  return (
    <Layout>
      <Box>
        <Box
          sx={{
            width: "50%",
            mx: "auto",
            background: "rgb(255,225,4)",
            height: "50vh",
            mt: "10%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ border: "black solid 2px", width: "100%" }}>
                Type any word into the field below
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                value={userInputWord}
                sx={{ border: "black solid 2px", width: "100%" }}
                onChange={(e) => {
                  setUserInputWord(e.target.value);
                }}
              />
            </Box>
            <Box>
              <Button onClick={submitWordToDB}>
                press here to submit word
              </Button>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ border: "black solid 2px", width: "100%" }}>
                Session information displayed here.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default WordInput;
