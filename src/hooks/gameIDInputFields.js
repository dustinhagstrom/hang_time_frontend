import { useState } from "react";
import { isAlpha } from "validator";

function GameIDInputFields(inputType) {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

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
    }
    if (!isAlpha(value)) {
      setIsError(true);
      setErrorMessage(`${inputType} only contains letters!`);
      setIsDisabled(true);
    }
    if (value.length !== 4) {
      setIsError(true);
      setErrorMessage(`${inputType} is four letters long.`);
      setIsDisabled(true);
    } else {
      setIsError(false);
      setErrorMessage("");
      setIsDisabled(false);
    }
  }

  return [value, onChange, isError, errorMessage, isDisabled, clearInput];
}

export default GameIDInputFields;
