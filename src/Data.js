export const userData = [
  {
    _id: "123",
    email: "dusty@email.com",
    username: "dusty",
    password: "password",
    firstName: "dustin",
    lastName: "hagstrom",
  },
  // {
  //     email: "justin@email.com"
  //     username: "justin",
  //     password: "password",
  //     firstName: "justin",
  //     lastName: "lastname",
  // }
];

export const wordBank = {
  word: "",
};

export const wrongAnswerStrikes = {
  strikes: 0,
};

export const logInUser = (email, password) =>
  new Promise((resolve, reject) => {
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
          resolve(userFound);
        }
        throw new Error("Incorrect username or password");
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });
