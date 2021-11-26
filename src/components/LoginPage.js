import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logInUser, signUpUser } from "../Data";
import { logInActionCreator } from "../redux/userState";
import Layout from "./Layout";
import PopUp from "./PopUp";

const Form = (props) => {
  const { setError } = props;
  //var's below set to allow login initially. (no user => then signup instead);
  let isARegisteredUser = false;
  let buttonName = isARegisteredUser ? "Login" : "Sign Up";

  const [{ email, password, username, firstName, lastName }, setCredentials] =
    useState({
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
    });

  const dispatch = useDispatch();

  const onSubmit = () => {
    logInUser(email, password)
      .then((user) => dispatch(logInActionCreator(user)))
      .catch((e) => {
        console.log("error: ", e);
        setError(e.message);
      });
  };

  const onSignUp = () => {
    signUpUser(email, password, username, firstName, lastName)
      .then((response) => {
        console.log(response);
        const { successMessage } = response;
        <PopUp successMessage={successMessage} />;
      })
      .catch((e) => {
        console.log("error: ", e);
        setError(e.message);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <TextField
          id="standard-basic"
          label="Email"
          variant="outlined"
          required
          value={email}
          onChange={(e) => {
            setCredentials({
              password,
              email: e.target.value,
              username,
              firstName,
              lastName,
            });
          }}
        />
      </Box>
      <Box>
        <TextField
          id="standard-basic"
          label="Password"
          variant="outlined"
          type="password"
          required
          value={password}
          onChange={(e) => {
            setCredentials({
              email,
              password: e.target.value,
              username,
              firstName,
              lastName,
            });
          }}
        />
      </Box>
      <Box>
        <TextField
          id="standard-basic"
          label="Username"
          variant="outlined"
          required
          value={username}
          onChange={(e) => {
            setCredentials({
              email,
              username: e.target.value,
              password,
              firstName,
              lastName,
            });
          }}
        />
      </Box>
      <Box>
        <TextField
          id="standard-basic"
          label="First Name"
          variant="outlined"
          required
          value={firstName}
          onChange={(e) => {
            setCredentials({
              email,
              firstName: e.target.value,
              password,
              username,
              lastName,
            });
          }}
        />
      </Box>
      <Box>
        <TextField
          id="standard-basic"
          label="Last Name"
          variant="outlined"
          required
          value={lastName}
          onChange={(e) => {
            setCredentials({
              email,
              lastName: e.target.value,
              username,
              firstName,
              password,
            });
          }}
        />
      </Box>
      <Box>
        <Button onClick={isARegisteredUser ? onSubmit : onSignUp}>
          {buttonName}
        </Button>
      </Box>
    </Box>
  );
};

function LoginPage() {
  const [error, setError] = useState();
  const user = useSelector((state) => state.user);

  return (
    <Layout>
      {error}
      {user ? <PopUp /> : <Form setError={setError} />}
    </Layout>
  );
}

export default LoginPage;
