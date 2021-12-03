const WORD_INITIAL_STATE = { word: "production" };

//ACTION
const NEW_WORD_ACTION = "dustinhagstrom.codes/NEW_WORD_ACTION";

//ACTION CREATORS
export const newWordActionCreator = (word) => ({
  type: NEW_WORD_ACTION,
  payload: { word },
});

export const wordReducer = (state = WORD_INITIAL_STATE, action) => {
  if (action.type === NEW_WORD_ACTION) {
    const { payload } = action;

    return payload.word;
  }

  return state;
};
