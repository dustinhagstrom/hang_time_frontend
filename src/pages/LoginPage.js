import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logInUser, signUpUser } from "../Data";
import { logInActionCreator } from "../redux/userState";
import Layout from "../components/Layout";
import PopUp from "../components/PopUp";

const Form = (props) => {
  const { setError, setSuccessMessage } = props;
  //var's below set to allow login initially. (no user => then signup instead);
  const [isARegisteredUser, setIsARegisteredUser] = useState(true);
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
        setSuccessMessage(successMessage);
        toggleIsARegisteredUser(); //this toggles Boolean and clears input fields.
      })
      .catch((e) => {
        //if error then the input fields do not
        console.log("error: ", e);
        setError(e.message);
      });
  };

  const toggleIsARegisteredUser = () => {
    setIsARegisteredUser(!isARegisteredUser);
    removeValueFromTextField();
  };

  const removeValueFromTextField = () => {
    setCredentials({
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
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
      {isARegisteredUser ? (
        <>
          <Box>
            <Typography onClick={toggleIsARegisteredUser}>
              Click here for signup options!
            </Typography>
          </Box>
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
                });
              }}
            />
          </Box>
        </>
      ) : (
        <>
          <Box>
            <Typography onClick={toggleIsARegisteredUser}>
              Click here for login options!
            </Typography>
          </Box>
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
        </>
      )}
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
  const [successMessage, setSuccessMessage] = useState();
  const user = useSelector((state) => state.user);

  const selfClosingMessage = () => {
    setError(null);
    setSuccessMessage(null);
  };

  useEffect(() => {
    if (error || successMessage) {
      setTimeout(() => {
        selfClosingMessage();
      }, 5000);
    }
  }, [error, successMessage]);
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          color: error ? "red" : "green",
          minHeight: "5vh",
        }}
      >
        {error || successMessage}
      </Box>
      {user ? (
        <PopUp />
      ) : (
        <Form setError={setError} setSuccessMessage={setSuccessMessage} />
      )}
    </Layout>
  );
}

export default LoginPage;
