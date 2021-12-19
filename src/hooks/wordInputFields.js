import { useState } from "react";
import { isAlpha } from "validator";

function WordInputFields(inputType) {
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
      setErrorMessage(
        `${inputType} can only have letters and it cannot have spaces!`
      );
      setIsDisabled(true);
    } else {
      setIsError(false);
      setErrorMessage(``);
      setIsDisabled(false);
    }
  }

  return [value, onChange, isError, errorMessage, isDisabled, clearInput];
}

export default WordInputFields;
