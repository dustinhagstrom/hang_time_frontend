const STRIKES_INITIAL_STATE = { strikes: null };

//ACTION
const NEW_STRIKE_ACTION = "dustinhagstrom.codes/NEW_STRIKE_ACTION";

//ACTION CREATORS
export const newStrikeActionCreator = (strikes) => ({
  type: NEW_STRIKE_ACTION,
  payload: { strikes },
});

export const strikeReducer = (state = STRIKES_INITIAL_STATE, action) => {
  if (action.type === NEW_STRIKE_ACTION) {
    const { payload } = action;

    return payload.strikes;
  }

  return state;
};
