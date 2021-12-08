TODOS:

for game page:

- working on synthetic click event to remove button visibility for player one.
- fix the reload on gamepage to keep letters populated.
- when the backend can support storage and retrieval of wordBank items, then verify proper operation. current config in FE w/o BE resets wordBank in redux to default word on data page whenever action is dispatched.
- determine whether I need js-cookie
- make the game responsive for various screen sizes
- make everything pretty
- game over message with win or loss?
- hook up the play again to reload the component for the input box for a word to be put in again. meanwhile, the opponent is pushed to gamepage and the word that is below the hangman could be a message saying "waiting for game creator to input another word" or something like that.

Optional things:

- make a function that allows players to swap from opponent to player after game ends.
- make a log that tracks all the games for a specific player
- make a schema for a game that creates a game object whenever a new game is started and can say whether opponent figured out the word or not.
-
-

TO FIGURE OUT:

- how to have multiple sessions at one time with one db.
- should I even have a db that tracks strikes? or should I do something that persists on the front end during game play?
-
