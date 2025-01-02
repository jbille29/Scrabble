import React, { useState } from "react";
import Board from "./components/Board";
import LetterPool from "./components/LetterPool";
import GameEndModal from "./components/GameEndModal";
import { calculateScore, findWordsOnBoard } from "./utils/calculateScore";

const letterScores = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2,
  H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1,
  O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1,
  V: 4, W: 4, X: 8, Y: 4, Z: 10,
};

const prePlacedTiles = [
  { position: 3, letter: "S" },
  { position: 10, letter: "T" },
  { position: 19, letter: "A" },
  { position: 35, letter: "R" },
  { position: 55, letter: "E" },
];

const generateBoard = () => {
  const board = Array.from({ length: 64 }, (_, i) => ({
    letter: null,
    points: null,
    bonus:
      i === 5
        ? "Mystery"
        : i === 15
        ? "Bomb"
        : i === 31
        ? "Lose 5"
        : i === 47
        ? "Add Unused"
        : null,
  }));

  prePlacedTiles.forEach((tile) => {
    board[tile.position].letter = tile.letter;
    board[tile.position].points = letterScores[tile.letter];
  });

  return board;
};



const App = () => {
  const [board, setBoard] = useState(generateBoard());
  const [isGameOver, setIsGameOver] = useState(true);
  const [letters, setLetters] = useState([
    { letter: "A", points: 1, used: false },
    { letter: "R", points: 1, used: false },
    { letter: "E", points: 1, used: false },
    { letter: "T", points: 1, used: false },
    { letter: "S", points: 1, used: false },
    { letter: "L", points: 1, used: false },
    { letter: "N", points: 1, used: false },
    { letter: "O", points: 1, used: false },
  ]);

  const stats = {
    words: 10,
    points: 120,
    bonus: 20,
  };

  const handleSubmit = () => {
    const { words, score } = findWordsOnBoard(board);
    const unusedLetters = letters.filter((l) => !l.used).length;
    let totalScore = score - unusedLetters * 2; // Deduct 2 points for each unused letter.

    board.forEach((tile) => {
      if (tile.letter && tile.bonus === "Lose 5") {
        totalScore -= 5;
      }
      if (tile.letter && tile.bonus === "Add Unused") {
        totalScore += unusedLetters;
      }
    });

    if (words.length === 0) {
      console.error("Invalid placement: No valid words formed.");
    } else {
      console.log("Words formed:", words);
      console.log("Score:", totalScore);
    }
  };

  const handleGameEnd = () => {
    setIsGameOver(true);
  };
  
  const handlePlayAgain = () => {
    setIsGameOver(false);
    // Reset the game state here
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Poppins, sans-serif" }}>
      <h1 style={{ color: "#4ade80" }}>Word Path Challenge</h1>
      <Board board={board} setBoard={setBoard} letters={letters} setLetters={setLetters} />
      <LetterPool letters={letters} setLetters={setLetters} />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4ade80",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Submit Words
      </button>

      <GameEndModal
        isOpen={isGameOver}
        onClose={handlePlayAgain}
        stats={stats}
        board={board}
      />
    </div>
  );
};

export default App;
