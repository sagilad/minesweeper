# minesweeper
minesweeper for wix

run it on: http://rawgit.com/sagilad/minesweeper/master/index.html

**Test cases:**

Test# | Description | Steps | Expected result
--- | --- | --- | --- 
1 | Start game | Select Height, width and nubmers of mines and start the game  | The game will start
2 | Zero height and width | Select Height and widht as zero and start the game  | The game is starting with defult of 9x9 row and colums
3 | Reveal cell | press on a cell | Click on cell reveals the value underneath it: it will display the number of mines arround the cell.  if it is a mine - You Lose text appers. if there are no mines around the cell - all cells around it will be revealed and also all cells around any adjacent empty cell
4 | Add a flag | Start the game (choose x amount of mines), then shift + click on a cell  | a flag will be shown on the cell, and the number of the remaining flags will be decresed by one 
5 | Remove a flag | shift + click on a cell with a flag on it  | the flag will be removed from the cell, and the number of the remaining flags will be increased by one
6 | Click on a flag | click on a cell with a flag on it  | the flag will remain and the cell will stay covered
7 | No more flags | start a game, then keep placing flags (shift + click) until you don't have any more remaing flags, then place another one | an alert message will pop up saying "you don't have any more flags" and no flag will be placed
8 | Start a new game during existing one | Start a game and play, then select Height, width and nubmers of mines and restart a game  | The game will restart with new selected values and all messages will disappear 
9 | Superman | start a game and checked the Superman Checkbox  | all cells will be reveald 
10 | Wining | start a game, keep revealing the cells and marked all the mines with flags (you can start the game with 1 mine to make it easy)  | when all mines are flagged correctly, you win text will appear
