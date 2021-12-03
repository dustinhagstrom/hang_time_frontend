const PLAYER_ONE_INITIAL_STATE = { playerOne: null };
const PLAYER_TWO_INITIAL_STATE = { playerTwo: null };

//ACTION
const SET_PLAYER_ONE = "dustinhagstrom.codes/SET_PLAYER_ONE";
const SET_PLAYER_TWO = "dustinhagstrom.codes/SET_PLAYER_TWO";

//ACTION CREATORS
export const setPlayerOneActionCreator = (playerOne) => ({
  type: SET_PLAYER_ONE,
  payload: { playerOne },
});

export const setPlayerTwoActionCreator = (playerTwo) => ({
  type: SET_PLAYER_TWO,
  payload: { playerTwo },
});

export const playerOneReducer = (state = PLAYER_ONE_INITIAL_STATE, action) => {
  if (action.type === SET_PLAYER_ONE) {
    const { payload } = action;

    return payload.playerOne;
  }

  return state;
};

export const playerTwoReducer = (state = PLAYER_TWO_INITIAL_STATE, action) => {
  if (action.type === SET_PLAYER_TWO) {
    const { payload } = action;

    return payload.playerTwo;
  }

  return state;
};
