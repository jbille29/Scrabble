import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import LetterPool from "./components/LetterPool";
import GameEndModal from "./components/GameEndModal";

const fakeBackendData = {
  date: "2024-12-31",
  board: Array(64).fill(null).map((_, i) => ({
    letter: i === 3 ? "S" : i === 10 ? "T" : i === 19 ? "A" : null,
    bonus: i === 5 ? "Mystery" : i === 15 ? "Bomb" : null,
  })),
  extraLetters: [
    { letter: "A" },
    { letter: "R" },
    { letter: "E" },
    { letter: "T" },
    { letter: "S" },
    { letter: "L" },
    { letter: "N" },
    { letter: "O" },
  ],
};

const letterScores = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2,
  H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1,
  O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1,
  V: 4, W: 4, X: 8, Y: 4, Z: 10,
};

const App = () => {
  const [board, setBoard] = useState([]);
  const [letters, setLetters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Simulate backend fetch
    const fetchData = async () => {
      const data = fakeBackendData; // Replace with actual fetch call
      const populatedBoard = data.board.map((tile) => ({
        ...tile,
        points: tile.letter ? letterScores[tile.letter] : null, // Calculate points on the frontend
      }));
      setBoard(populatedBoard);
      setLetters(data.extraLetters.map((l) => ({ ...l, points: letterScores[l.letter], used: false })));
    };

    fetchData();
  }, []);

  const handlePlayAgain = () => {
    setIsGameOver(false);
    // Reset state as needed
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Poppins, sans-serif" }}>
      <h1 style={{ color: "#4ade80" }}>Word Path Challenge</h1>
      <Board board={board} setBoard={setBoard} letters={letters} setLetters={setLetters} />
      <LetterPool letters={letters} setLetters={setLetters} />
      <button
        onClick={() => console.log("Submit Words")}
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
        stats={{ words: 0, points: 0, bonus: 0 }}
        board={board}
      />
    </div>
  );
};

export default App;
