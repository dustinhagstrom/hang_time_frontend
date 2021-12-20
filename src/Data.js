import { Axios } from "./Axios";

export const logInUser = async (email, password) =>
  Axios({
    method: "post",
    url: "/users/loginUser",
    data: {
      email,
      password,
    },
  });

export const signUpUser = async (
  email,
  password,
  username,
  firstName,
  lastName
) =>
  Axios({
    method: "post",
    url: "/users/new",
    data: {
      email,
      password,
      username,
      firstName,
      lastName,
    },
  });

export const addWordToDB = async (wordBank) =>
  Axios({
    method: "post",
    url: "/word/new",
    data: wordBank,
  });

export const addPlayerTwoDataToWord = async (email, gameID) =>
  Axios({
    method: "put",
    url: "/word/playerTwo",
    data: { email, gameID },
  });

export const updateWordInDBOnPlayerTwoGuess = async (newWordBank) =>
  Axios({
    method: "put",
    url: "/word/guess",
    data: newWordBank,
  });

export const editWordOnGameOverCondition = async (newWordBank) =>
  Axios({
    method: "put",
    url: "/word/gameOver",
    data: newWordBank,
  });

export const deleteWordOnGameOverCondition = async ({ gameID }) =>
  Axios({
    method: "delete",
    url: "/word/endSession",
    data: { gameID },
  });
