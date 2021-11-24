//this contains the user state and also has the logic for the store and actions.
import { combineReducers, createStore } from "redux";
import { userReducer } from "./userState";
import { WordReducer } from "./wordState";

const rootReducer = combineReducers({
  user: userReducer,
  wordBank: WordReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
