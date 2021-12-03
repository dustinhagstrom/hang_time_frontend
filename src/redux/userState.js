const USER_INITIAL_STATE = { user: null };

//ACTION
const SIGN_UP_ACTION = "dustinhagstrom.codes/SIGN_UP_ACTION";
const LOG_IN_ACTION = "dustinhagstrom.codes/LOG_IN";
const UPDATE_USER = "dustinhagstrom.codes/UPDATE_USER";
const DELETE_USER = "dustinhagstrom.codes/DELETE_USER";

//ACTION CREATORS

export const signUpActionCreator = (user) => ({
  type: SIGN_UP_ACTION,
  payload: { user },
});

export const logInActionCreator = (user) => ({
  type: LOG_IN_ACTION,
  payload: { user },
});

export const updateUserActionCreator = (updatedUser) => ({
  type: UPDATE_USER,
  payload: { updatedUser },
});

export const deleteUserActionCreator = (user) => ({
  type: DELETE_USER,
  payload: { user },
});

export const userReducer = (state = USER_INITIAL_STATE, action) => {
  if (action.type === LOG_IN_ACTION) {
    const { payload } = action;

    return payload.user;
  }
  if (action.type === UPDATE_USER) {
    const { payload } = action;

    return payload.updatedUser;
  }
  if (action.type === DELETE_USER) {
    const { payload } = action;

    return payload.user;
  }
  if (action.type === SIGN_UP_ACTION) {
    const { payload } = action;

    return payload.user;
  }

  return state;
};
