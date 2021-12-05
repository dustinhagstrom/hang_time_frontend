import { wordBank } from "../Data";

const WORD_INITIAL_STATE = { wordBank: null };

//ACTION
const NEW_WORD_ACTION = "dustinhagstrom.codes/NEW_WORD_ACTION";
const UPDATE_EMPTY_LETTERS_ACTION =
  "dustinhagstrom.codes/UPDATE_EMPTY_LETTERS_ACTION";
const CORRECT_LETTERS_ACTION = "dustinhagstrom.codes/CORRECT_LETTERS_ACTION";

//ACTION CREATORS
export const newWordActionCreator = (word) => ({
  type: NEW_WORD_ACTION,
  payload: { ...wordBank, word },
});

export const updateEmptyLettersActionCreator = (emptyLetters) => ({
  type: UPDATE_EMPTY_LETTERS_ACTION,
  payload: { ...wordBank, emptyLetters },
});

export const updateCorrectLettersActionCreator = (clickedLetters) => {
  const { correctLetters } = clickedLetters;

  let newWordBank = { ...wordBank };
  newWordBank.correctLetters.push(correctLetters);

  return {
    type: CORRECT_LETTERS_ACTION,
    payload: newWordBank,
  };
};

export const wordReducer = (state = WORD_INITIAL_STATE, action) => {
  if (action.type === NEW_WORD_ACTION) {
    const { payload } = action;

    return payload;
  }

  if (action.type === UPDATE_EMPTY_LETTERS_ACTION) {
    const { payload } = action;

    return payload;
  }

  if (action.type === CORRECT_LETTERS_ACTION) {
    const { payload } = action;

    return payload;
  }

  return state;
};
