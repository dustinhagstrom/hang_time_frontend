import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { logInUser, signUpUser } from "../Data";
import { logInActionCreator } from "../redux/userState";
import Layout from "../components/Layout";
import PopUp from "../components/PopUp";
import { axiosErrorMessage } from "../Axios";
import UserInputFields from "../hooks/userInputFields";
import { Link, useNavigate } from "react-router-dom";

const Form = (props) => {
  const { setError, setSuccessMessage } = props;

  let isLoginRoute = window.location.pathname === "/login";

  let buttonName = isLoginRoute ? "Login" : "Sign Up";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [
    firstName,
    firstNameOnChange,
    firstNameError,
    firstNameErrorMessage,
    firstNameIsDisabled,
    clearFirstNameInput,
  ] = UserInputFields("firstName");
  const [
    lastName,
    lastNameOnChange,
    lastNameError,
    lastNameErrorMessage,
    lastNameIsDisabled,
    clearLastNameInput,
  ] = UserInputFields("lastName");
  const [
    email,
    emailOnChange,
    emailError,
    emailErrorMessage,
    emailIsDisabled,
    clearEmailInput,
  ] = UserInputFields("email");
  const [
    username,
    usernameOnChange,
    usernameError,
    usernameErrorMessage,
    usernameIsDisabled,
    clearUsernameInput,
  ] = UserInputFields("username");
  const [
    password,
    passwordOnChange,
    passwordError,
    passwordErrorMessage,
    passwordIsDisabled,
    clearPasswordInput,
  ] = UserInputFields("password");
  const [
    confirmPassword,
    confirmPasswordOnChange,
    confirmPasswordError,
    confirmPasswordErrorMessage,
    confirmPasswordIsDisabled,
    clearConfirmPasswordInput,
  ] = UserInputFields("confirmPassword");

  const clearAllInputs = () => {
    clearEmailInput();
    clearUsernameInput();
    clearPasswordInput();
    clearFirstNameInput();
    clearLastNameInput();
    clearConfirmPasswordInput();
  };

  const onSubmit = () => {
    logInUser(email, password)
      .then((res) => {
        const userData = res.data.user;
        const successfulLoginMessage = res.data.message;
        setError(null);
        setSuccessMessage(successfulLoginMessage);
        dispatch(logInActionCreator(userData));
      })
      .catch((e) => {
        let errMessage = axiosErrorMessage(e);
        setSuccessMessage(null);
        setError(errMessage);
      });
  };

  const onSignUp = () => {
    signUpUser(email, password, username, firstName, lastName)
      .then((res) => {
        console.log(res);
        const { message } = res.data;
        setError(null);
        setSuccessMessage(message);
        if (message === "user created successfully, please login.") {
          clearAllInputs();
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((e) => {
        let errMessage = axiosErrorMessage(e);
        setSuccessMessage(null);
        setError(errMessage);
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
      {isLoginRoute ? (
        <>
          <Box>
            <TextField
              id="standard-basic"
              label={emailError ? emailErrorMessage : "Email"}
              variant="outlined"
              error={emailError}
              color={emailError ? "error" : "success"}
              required
              value={email}
              onChange={emailOnChange}
            />
          </Box>
          <Box>
            <TextField
              id="standard-basic"
              label={passwordError ? passwordErrorMessage : "Password"}
              variant="outlined"
              error={passwordError}
              color={passwordError ? "error" : "success"}
              type="password"
              required
              value={password}
              onChange={passwordOnChange}
            />
          </Box>
        </>
      ) : (
        <>
          <Box>
            <TextField
              id="standard-basic"
              label={firstNameError ? firstNameErrorMessage : "First Name"}
              variant="outlined"
              error={firstNameError}
              color={firstNameError ? "error" : "success"}
              required
              value={firstName}
              onChange={firstNameOnChange}
            />
          </Box>
          <Box>
            <TextField
              id="standard-basic"
              label={lastNameError ? lastNameErrorMessage : "Last Name"}
              variant="outlined"
              error={lastNameError}
              color={lastNameError ? "error" : "success"}
              required
              value={lastName}
              onChange={lastNameOnChange}
            />
          </Box>
          <Box>
            <TextField
              id="standard-basic"
              label={emailError ? emailErrorMessage : "Email"}
              variant="outlined"
              error={emailError}
              color={emailError ? "error" : "success"}
              required
              value={email}
              onChange={emailOnChange}
            />
          </Box>
          <Box>
            <TextField
              id="standard-basic"
              label={usernameError ? usernameErrorMessage : "Username"}
              variant="outlined"
              error={usernameError}
              color={usernameError ? "error" : "success"}
              required
              value={username}
              onChange={usernameOnChange}
            />
          </Box>
          <Box>
            <TextField
              id="password"
              label={passwordError ? passwordErrorMessage : "Password"}
              variant="outlined"
              error={passwordError}
              color={passwordError ? "error" : "success"}
              required
              type="password"
              value={password}
              onChange={passwordOnChange}
            />
          </Box>
          <Box>
            <TextField
              id="standard-basic"
              label={
                confirmPasswordError
                  ? confirmPasswordErrorMessage
                  : "Confirm Password"
              }
              error={confirmPasswordError}
              color={confirmPasswordError ? "error" : "success"}
              variant="outlined"
              required
              type="password"
              value={confirmPassword}
              onChange={confirmPasswordOnChange}
            />
          </Box>
        </>
      )}
      <Box>
        <Button
          onClick={isLoginRoute ? onSubmit : onSignUp}
          disabled={
            isLoginRoute
              ? emailIsDisabled || passwordIsDisabled
              : emailIsDisabled ||
                passwordIsDisabled ||
                confirmPasswordIsDisabled ||
                usernameIsDisabled ||
                firstNameIsDisabled ||
                lastNameIsDisabled
          }
        >
          {buttonName}
        </Button>
      </Box>
      {isLoginRoute ? (
        <Box>
          <Typography>
            <Link to="/signup" onClick={clearAllInputs}>
              Don't have an account? Sign Up (here)
            </Link>
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography>
            <Link to="/login" onClick={clearAllInputs}>
              Have an account? Login (here){" "}
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

function LoginPage() {
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const user = useSelector((state) => state.user);

  const timer = () =>
    setTimeout(() => {
      setError(null);
      setSuccessMessage(null);
    }, 2000);

  useEffect(() => {
    if (error || successMessage) {
      timer();
    }

    return () => {
      clearTimeout(timer);
    };
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
      {user && user.username ? (
        <PopUp appCondition={"WelcomeUser"} />
      ) : (
        <Form setError={setError} setSuccessMessage={setSuccessMessage} />
      )}
    </Layout>
  );
}

export default LoginPage;
