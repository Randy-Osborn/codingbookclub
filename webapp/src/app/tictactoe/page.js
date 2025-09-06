"use client";
import { useState } from "react";

// --- Game Logic (adapted from your Node.js version) ---
const PLAYER_X = "X";
const PLAYER_O = "O";

function newGame() {
  return Array.from({ length: 3 }, () => Array(3).fill(null));
}

function makeMove(board, row, col, player) {
  if (row < 0 || row > 2 || col < 0 || col > 2) return false;
  if (board[row][col] === null) {
    board[row][col] = player;
    return true;
  }
  return false;
}

function checkWinner(board) {
  // Rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      return board[row][0];
    }
  }
  // Columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      return board[0][col];
    }
  }
  // Diagonals
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }
  // Draw check
  if (board.every(row => row.every(cell => cell !== null))) {
    return "Draw";
  }
  return null;
}

// --- React Component ---
export default function TicTacToePage() {
  const [board, setBoard] = useState(newGame());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X);
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (winner || board[row][col] !== null) return; // Ignore if game over or filled

    const newBoard = board.map(rowArr => [...rowArr]);
    if (makeMove(newBoard, row, col, currentPlayer)) {
      setBoard(newBoard);
      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result);
      } else {
        setCurrentPlayer(currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X);
      }
    }
  };

  const resetGame = () => {
    setBoard(newGame());
    setCurrentPlayer(PLAYER_X);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      {winner ? (
        <h2 className="text-xl mb-2">
          {winner === "Draw" ? "It's a draw!" : `Player ${winner} wins!`}
        </h2>
      ) : (
        <h2 className="text-xl mb-2">Current Player: {currentPlayer}</h2>
      )}
      <div className="grid grid-cols-3 gap-2">
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              className="w-20 h-20 text-2xl font-bold border-2 border-gray-600 flex items-center justify-center"
            >
              {cell}
            </button>
          ))
        )}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset Game
      </button>
    </div>
  );
}
