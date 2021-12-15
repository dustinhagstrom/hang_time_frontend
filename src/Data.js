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

export const addCorrectLettersToWord = async ({
  correctLetters,
  emptyLetters,
  gameID,
}) =>
  Axios({
    method: "put",
    url: "/word/correct",
    data: { correctLetters, emptyLetters, gameID },
  });

export const addIncorrectLettersToWord = async ({
  incorrectLetters,
  gameID,
  strikes,
}) =>
  Axios({
    method: "put",
    url: "/word/incorrect",
    data: { incorrectLetters, gameID, strikes },
  });

// export const addIncorrectLettersToWord = async ({
//   incorrectLetters,
//   gameID,
//   strikes,
// }) =>
//   Axios({
//     method: "put",
//     url: "/word/incorrect",
//     data: { incorrectLetters, gameID, strikes },
//   });

export const editWordOnGameOverCondition = async ({
  word,
  emptyLetters,
  gameID,
}) =>
  Axios({
    method: "put",
    url: "/word/gameOver",
    data: { word, emptyLetters, gameID },
  });
