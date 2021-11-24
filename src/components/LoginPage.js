import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logInUser } from "../Data";
import { logInActionCreator } from "../redux/userState";
import Layout from "./Layout";

const Form = (props) => {
  const { setError } = props;

  const [{ email, password }, setCredentials] = useState({
    email: "",
    password: "",
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

  return (
    <Box>
      <Box>
        <TextField
          id="standard-basic"
          label="email"
          variant="standard"
          value={email}
          onChange={(e) => {
            setCredentials({ password, email: e.target.value });
          }}
        />
      </Box>
      <Box>
        <TextField
          id="standard-basic"
          label="password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => {
            setCredentials({ email, password: e.target.value });
          }}
        />
      </Box>
      <Box>
        <Button onClick={onSubmit}>log in</Button>
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
      {user ? `Welcome back ${user.username}!` : <Form setError={setError} />}
    </Layout>
  );
}

export default LoginPage;
