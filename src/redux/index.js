//this contains the user state and also has the logic for the store and actions.
import { combineReducers } from "redux";
import { playerOneReducer, playerTwoReducer } from "./playerState";
import { userReducer } from "./userState";
import { wordReducer } from "./wordState";

export default combineReducers({
  user: userReducer,
  wordBank: wordReducer,
  playerOne: playerOneReducer,
  playerTwo: playerTwoReducer,
});
