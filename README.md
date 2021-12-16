TODOS:

for login page:

- (if I have time) make a success message overwrite an error message

for game page:

- make the game responsive for various screen sizes
- make everything pretty

for home page:

for pop up:

- make it to where if not on game page -> the game over condition is reset. this prevents the game over pop up from being returned outside of game page.

for data.js:

for hostSession.js:

- maybe refactor the actual word input into a seperate component that I can then use in the pop up component at the end of a game.

Optional things:

- (logic in popup component) if either player clicks new game -> new game with players swapped.
- make a function that allows players to swap from opponent to player after game ends.
- make a log that tracks all the games for a specific player
- make a schema for a game that creates a game object whenever a new game is started and can say whether opponent figured out the word or not.
- (logic in popup component) make a button that can let users decide who is player one and who is player two at the end of a game.
- (logic in popup component) make it such that both users have to click new game to start a new game or if one person clicks it then it starts a countdown to new game and auto starts at end of countdown. If both players click button then the game is started then and there

TO FIGURE OUT:

- memory leak prolly due to setTimeout funcs for success and error messages.
- how to have multiple sessions at one time with one db.
- should I even have a db that tracks strikes? or should I do something that persists on the front end during game play?
-
