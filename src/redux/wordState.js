const WORD_INITIAL_STATE = { wordBank: null };

//ACTION
const NEW_WORD_ACTION = "dustinhagstrom.codes/NEW_WORD_ACTION";
const PLAYER_TWO_GUESS_ACTION = "dustinhagstrom.codes/PLAYER_TWO_GUESS_ACTION";

//ACTION CREATORS
export const newWordActionCreator = (wordBank) => {
  return {
    type: NEW_WORD_ACTION,
    payload: wordBank,
  };
};

export const setPlayerTwoGuessActionCreator = (wordBank) => {
  return {
    type: PLAYER_TWO_GUESS_ACTION,
    payload: wordBank,
  };
};

export const wordReducer = (state = WORD_INITIAL_STATE, action) => {
  if (action.type === NEW_WORD_ACTION) {
    const { payload } = action;

    return payload;
  }

  if (action.type === PLAYER_TWO_GUESS_ACTION) {
    const { payload } = action;

    return payload;
  }

  return state;
};
