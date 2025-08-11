const fs = require("fs");

// Part 1: Board Initialization
function newGame() {
  // return a fresh, empty 3x3 board
  return Array.from({ length: 3 }, () => Array(3).fill(null));
}

// Part 2: Player Representation
const PLAYER_X = "X";
const PLAYER_O = "O";

// Part 3: Making Moves
function makeMove(board, row, col, player) {
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    return false;
  }
  if (board[row][col] === null) {
    board[row][col] = player;
    return true;
  } else {
    return false;
  }
}

// Part 4: Winner and Draw Detection
function checkWinner(board) {
  // TODO: return 'X', 'O', 'Draw', or null
  //check rows
  for (let row = 0; row < board.length; row++) {
    if (
      board[row][0] != null &&
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2]
    ) {
      return board[row][0];
    }
  }

  //check columns
  for (let col = 0; col < board.length; col++) {
    if (
      board[0][col] != null &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col]
    ) {
      return board[0][col];
    }
  }

  //diag 1
  if (
    board[0][0] != null &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0];
  }

  //diag 2
  //diag 1
  if (
    board[0][2] != null &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2];
  }
  // check for draw or Empty
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === null) {
        //null found keep playing
        return null;
      }
    }
  }
  return "Draw";
}

function printBoard(board) {
  console.log(
    board.map((row) => row.map((cell) => cell || "-").join(" ")).join("\n")
  );
}

// Part 5: Optional Game Flow
function play() {
  // TODO: implement basic game loop
  let board = newGame();
  let moves;

  //read in json file of moves
  try {
    const data = fs.readFileSync("moves.json", "utf8");
    moves = JSON.parse(data);
  } catch (err) {
    console.error("Error reading moves.json:", err);
    return;
  }

  let currentPlayer = PLAYER_X;
  let moveIndex = 0;

  while (true) {
    if (moveIndex >= moves.length) {
        console.log("no more moves in input");
        break;
    }
    const { row, col } = moves[moveIndex];
    
    if (makeMove(board, row, col, currentPlayer)) {
      console.log(`Player ${currentPlayer} moves to (${row}, ${col})`);
      printBoard(board);

      const result = checkWinner(board);
      if (result !== null) {
        if (result === "Draw") {
          console.log("Game ended in a draw.");
        } else {
          console.log(`Player ${result} wins!`);
        }
        break;  // game over
      }

      // Switch players and move to next move only after a successful move and no winner
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      moveIndex++;
    } else {
      // Invalid move: notify and still advance moveIndex (or keep it the same if you want retry)
      console.log(
        `Invalid move by player ${currentPlayer} at (${row}, ${col}). try again.`
      );
      moveIndex++;
    }
  }
}

// Export functions if running in Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    newGame,
    makeMove,
    checkWinner,
    play,
  };
}
