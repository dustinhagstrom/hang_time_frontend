import Cookies from "js-cookie";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useNavigate } from "react-router";

function Home() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const createASession = () => {
    return navigate("/host");
  };
  const joinASession = () => {
    return navigate("/join");
  };
  return (
    <Layout>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            mx: "auto",
            width: "100%",
            textAlign: "center",
            top: "0%",
          }}
        >
          {user ? (
            <Typography></Typography>
          ) : (
            <Typography>
              You must be logged in to create or join a session!
            </Typography>
          )}
        </Box>
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
              <Button
                sx={{ border: "black solid 2px", width: "100%" }}
                disabled={user ? false : true}
                onClick={createASession}
              >
                Create a Session
              </Button>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Button
                sx={{ border: "black solid 2px", width: "100%" }}
                disabled={user ? false : true}
                onClick={joinASession}
              >
                Join a Session
              </Button>
            </Box>
          </Box>
        </Box>
        {/* <Button onClick={retrieveCookieFromStorage}>retrieve cookie</Button>> */}
      </Box>
    </Layout>
  );
}

export default Home;
