import { useState } from "react";
import {
  isAlpha,
  isAlphanumeric,
  isEmail,
  isStrongPassword,
  isLength,
} from "validator";

const UserInputFields = (inputType) => {
  const [value, setValue] = useState(""); //value of the input field.
  const [isError, setIsError] = useState(false); //if validations fail.
  const [errorMessage, setErrorMessage] = useState(""); //error message displayed on fail.

  const [isDisabled, setIsDisabled] = useState(true); // submit/login button disabled unless validations pass.

  function onChange(e) {
    let value = e.target.value;
    setValue(value);

    checkInput(value);
  }

  function clearInput() {
    setValue("");
    setIsError(false);
    setIsDisabled(true);
  }

  function checkInput(value) {
    if (value.length === 0) {
      setIsError(true);
      setErrorMessage(`${inputType} is required`);
      setIsDisabled(true);
    } else if (inputType === "firstName" || inputType === "lastName") {
      if (!isAlpha(value)) {
        setIsError(true);
        setErrorMessage(`${inputType} can only have letters!`);
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    } else if (inputType === "Game Code") {
      if (!isAlpha(value)) {
        setIsError(true);
        setErrorMessage(`${inputType} can only have letters!`);
        setIsDisabled(true);
      } else if (value.length !== 4) {
        setIsError(true);
        setErrorMessage(`${inputType} must be 4 letters!`);
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    } else if (inputType === "Word") {
      if (!isAlpha(value)) {
        setIsError(true);
        setErrorMessage(`${inputType} can only have letters!`);
        setIsDisabled(true);
      } else if (!isLength(value, { min: 1, max: 45 })) {
        setIsError(true);
        setErrorMessage(`${inputType} must be between 1 and 45 letters long.`);
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    } else if (inputType === "email") {
      if (!isEmail(value)) {
        setIsError(true);
        setErrorMessage("Not a valid email!");
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    } else if (inputType === "username") {
      if (!isAlphanumeric(value)) {
        setIsError(true);
        setErrorMessage(`${inputType} can only have alphanumeric characters!`);
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    } else if (inputType === "password") {
      if (!isStrongPassword(value)) {
        setIsError(true);
        setErrorMessage(
          `Minimum password Req's: 8 characters long, one uppercase letter, one lowercase letter, one special character.`
        );
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    } else if (inputType === "confirmPassword") {
      let passwordInputField = document.getElementById("password");
      if (!isStrongPassword(value)) {
        setIsError(true);
        setErrorMessage(
          `Password must be at least 8 characters long, have at least one uppercase and lowercase letter, and contain at least one special character.`
        );
        setIsDisabled(true);
      } else if (value !== passwordInputField.value) {
        setIsError(true);
        setErrorMessage(`Your passwords do not match.`);
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    } else if (inputType === "Email" || inputType === "Password") {
      //less validation if user logging in.
      setIsError(false);
      setErrorMessage(``);
      setIsDisabled(false);
    }
  }

  return [value, onChange, isError, errorMessage, isDisabled, clearInput];
};

export default UserInputFields;
