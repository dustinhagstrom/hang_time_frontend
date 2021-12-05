export const userData = [
  {
    id: "123",
    email: "dusty@email.com",
    username: "dusty",
    password: "password",
    firstName: "dustin",
    lastName: "hagstrom",
  },
  {
    id: "234",
    email: "justin@email.com",
    username: "justin",
    password: "password",
    firstName: "justin",
    lastName: "lastname",
  },
];

export const wordBank = {
  word: "HANG",
  emptyLetters: 0,
  correctLetters: [],
};

export const strikes = {
  strikes: 0,
};

export const logInUser = (email, password) =>
  new Promise((resolve, reject) => {
    // .find method is taking a callback func as arg here.
    const userFound = userData.find((user) => {
      if (user.email === email && user.password === password) {
        return true;
      }
      return false;
    });

    console.log("fetching data from the imaginary database");
    setTimeout(() => {
      try {
        if (userFound) {
          const { email, username } = userFound;
          let onlyNecessaryUserData = { email, username };
          resolve(onlyNecessaryUserData);
        }
        throw new Error("Incorrect username or password");
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });

export const signUpUser = (email, password, username, firstName, lastName) =>
  new Promise((resolve, reject) => {
    const userFound = userData.find((user) => {
      if (user.email === email || user.username === username) {
        return true;
      }
      return false;
    });

    setTimeout(() => {
      try {
        if (userFound) {
          throw new Error("The email or username already exists!");
        }
        userData.push({
          id: userData.length + 1,
          email,
          password,
          username,
          firstName,
          lastName,
        });
        resolve({ successMessage: "user created successfully, please login." });
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });

export const addWordToDB = (word) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        wordBank.word = word;
        resolve({ message: "word is approved." });
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });

export const getWordInfoFromDB = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve({ wordBank });
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });

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

export const updateStrikesInDB = ({ resetStrikes }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        strikes.strikes = resetStrikes;
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
