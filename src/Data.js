import Cookies from "js-cookie";

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
  word: "",
};

export const wrongAnswerStrikes = {
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
          Cookies.set("user", JSON.stringify(onlyNecessaryUserData));
          resolve(onlyNecessaryUserData);
        }
        throw new Error("Incorrect username or password");
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });

export const signUpUser = (email, password, username, firstName, lastName) => {
  new Promise((resolve, reject) => {
    const userFound = userData.find((user) => {
      if (user.email === email || user.username === username) {
        return true;
      }
      return false;
    });
    console.log(email, password, firstName, lastName, username);

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
        console.log(userData);
        resolve("user created successfully, please login.");
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });
};
