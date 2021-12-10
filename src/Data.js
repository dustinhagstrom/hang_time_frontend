import Axios from "./Axios";

export const strikes = {
  strikes: 0,
};

export const axiosErrorMessage = (e) => {
  if (e.response) {
    let errorMessage = e.response.data.message;

    return errorMessage;
  }
};

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

export const wordBank = {
  word: "HAPPY",
  emptyLetters: 5,
  correctLetters: [],
  incorrectLetters: [],
};

// export const addWordToDB = (word) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         wordBank.word = word;
//         wordBank.emptyLetters = word.length;
//         wordBank.correctLetters = [];
//         wordBank.incorrectLetters = [];
//         resolve({ message: "word is approved.", wordBank });
//       } catch (e) {
//         reject(e);
//       }
//     }, 1000);
//   });

// export const getStrikeInfoFromDB = (word) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         wordBank.word = word;
//         resolve({ message: "word is approved." });
//       } catch (e) {
//         reject(e);
//       }
//     }, 1000);
//   });

export const updateStrikesInDB = (newStrikes) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        strikes.strikes = newStrikes;
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
