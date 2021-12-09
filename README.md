TODOS:

for game page:

- fix the reload on gamepage to keep filled letters populated and to keep the letter buttons invisible and disabled. same with the opponent field.
- when the backend can support storage and retrieval of wordBank items, then verify proper operation. current config in FE w/o BE resets wordBank in redux to default word on data page whenever action is dispatched.
- determine whether I need js-cookie
- make the game responsive for various screen sizes
- make everything pretty
- game over message with win or loss?
- hook up the play again to reload the component for the input box for a word to be put in again. meanwhile, the opponent is pushed to gamepage and the word that is below the hangman could be a message saying "waiting for game creator to input another word" or something like that.

for home page:

- currently have a no-op memory leak when join session is clicked. an update is trying to occur on unmounted component. ---maybe have this, but prolly not. something to do with data in redux store persisting during testing I think!
- do something about case where a user can click logo to return home during gameplay or even just from the game page.

for pop up:

- make it to where if not on game page -> the game over condition is reset. this prevents the game over pop up from being returned outside of game page.

- if either player clicks close session -> sent to home page and redux stores wiped except for user.

for data.js:

- figure out if I need the func's "getStrikeInfoFromDB" && "updateStrikesInDB". these might

for hostSession.js:

- currently working on refactoring the actual word input into a seperate component that I can then use in the pop up component at the end of a game.

Optional things:

- (logic in popup component) if either player clicks new game -> new game with players swapped.
- make a function that allows players to swap from opponent to player after game ends.
- make a log that tracks all the games for a specific player
- make a schema for a game that creates a game object whenever a new game is started and can say whether opponent figured out the word or not.
- (logic in popup component) make a button that can let users decide who is player one and who is player two at the end of a game.
- (logic in popup component) make it such that both users have to click new game to start a new game or if one person clicks it then it starts a countdown to new game and auto starts at end of countdown. If both players click button then the game is started then and there

TO FIGURE OUT:

- how to have multiple sessions at one time with one db.
- should I even have a db that tracks strikes? or should I do something that persists on the front end during game play?
-
