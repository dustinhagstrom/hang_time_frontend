import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Home() {
  const user = useSelector((state) => state.user);

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
          {user && user.username ? (
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
              <Link to="/host">
                <Button
                  sx={{ border: "black solid 2px", width: "100%" }}
                  disabled={user && user.username ? false : true}
                >
                  Create a Session
                </Button>
              </Link>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Link to="/join">
                <Button
                  sx={{ border: "black solid 2px", width: "100%" }}
                  disabled={user && user.username ? false : true}
                >
                  Join a Session
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default Home;
