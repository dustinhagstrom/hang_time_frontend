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

export const addIncorrectLettersToWord = async ({ incorrectLetters, gameID }) =>
  Axios({
    method: "put",
    url: "/word/incorrect",
    data: { incorrectLetters, gameID },
  });

export const updateStrikesInDB = (newStrikes) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // strikes.strikes = newStrikes;
        resolve({ message: "strikes updated." });
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });

//TODO this will route to back end with data of creator and opponent along with other applicable data from a game session.
export const instanceOfAGame = ({}) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve({ message: "instance of game route hit." });
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });
