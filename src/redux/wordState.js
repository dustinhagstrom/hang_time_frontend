//ACTION
const NEW_WORD_ACTION = "dustinhagstrom.codes/NEW_WORD_ACTION";

//ACTION CREATORS
export const newWordActionCreator = (word) => ({
  type: NEW_WORD_ACTION,
  payload: { word: word },
});

export const WordReducer = (state = "hsfhls", action) => {
  if (action.type === NEW_WORD_ACTION) {
    const { payload } = action;

    return payload.word;
  }

  return state;
};

//----------------------------------------------------//
//
//
//Strike Count State is below
//
//
//----------------------------------------------------//
//ACTION
const NEW_STRIKE_ACTION = "dustinhagstrom.codes/NEW_STRIKE_ACTION";

//ACTION CREATORS
export const newStrikeActionCreator = (strikes) => ({
  type: NEW_STRIKE_ACTION,
  payload: strikes,
});

export const StrikeReducer = (state = 6, action) => {
  if (action.type === NEW_STRIKE_ACTION) {
    const { payload } = action;

    return payload.strikes;
  }

  return state;
};
