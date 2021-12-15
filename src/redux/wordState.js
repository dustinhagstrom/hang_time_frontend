const WORD_INITIAL_STATE = { wordBank: null };

//ACTION
const NEW_WORD_ACTION = "dustinhagstrom.codes/NEW_WORD_ACTION";
const CORRECT_LETTERS_ACTION = "dustinhagstrom.codes/CORRECT_LETTERS_ACTION";
const INCORRECT_LETTERS_ACTION =
  "dustinhagstrom.codes/INCORRECT_LETTERS_ACTION";

//ACTION CREATORS
export const newWordActionCreator = (wordBank) => {
  return {
    type: NEW_WORD_ACTION,
    payload: wordBank,
  };
};

export const updateCorrectLettersActionCreator = (clickedLetters) => {
  const { correctLetters, emptyLetters, wordBank } = clickedLetters;
  console.log(
    correctLetters,
    "correctLetters",
    emptyLetters,
    "emptyLetters",
    "wordBank",
    wordBank
  );
  let newWordBank = { ...wordBank, emptyLetters: emptyLetters };
  newWordBank.correctLetters = correctLetters;
  console.log(newWordBank);
  return {
    type: CORRECT_LETTERS_ACTION,
    payload: newWordBank,
  };
};

export const updateIncorrectLettersActionCreator = (clickedLetters) => {
  const { incorrectLetters, wordBank, strikes } = clickedLetters;

  let newWordBank = { ...wordBank };
  newWordBank.incorrectLetters = incorrectLetters;

  return {
    type: INCORRECT_LETTERS_ACTION,
    payload: newWordBank,
  };
};

export const wordReducer = (state = WORD_INITIAL_STATE, action) => {
  if (action.type === NEW_WORD_ACTION) {
    const { payload } = action;

    return payload;
  }

  if (action.type === CORRECT_LETTERS_ACTION) {
    const { payload } = action;

    return payload;
  }

  if (action.type === INCORRECT_LETTERS_ACTION) {
    const { payload } = action;

    return payload;
  }

  return state;
};
