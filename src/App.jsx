import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import LetterPool from "./components/LetterPool";
import GameEndModal from "./components/GameEndModal";
import checkAdjacency from "./utils/checkAdjacency"; // Validate adjacency
import  validateWords  from "./utils/validateWords"; // Validate words
import { calculateScore } from "./utils/calculateScore"; // Calculate score

const App = () => {
  const [board, setBoard] = useState([]);
  const [letters, setLetters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [stats, setStats] = useState({ words: [], points: 0, unused: 0 });

  const fakeBackendData = {
    date: "2024-12-31",
    board: Array(64).fill(null).map((_, i) => ({
      prePlacedLetter: i === 3 ? "S" : i === 10 ? "T" : i === 19 ? "A" : null,
      bonus: i === 5 ? "Mystery" : i === 15 ? "Bomb" : null,
      letter: null,
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
    validWords: ["STAR", "START", "ART", "RAT", "TAR"], // Example word list
  };

  useEffect(() => {
    const loadGameData = () => {
      const data = fakeBackendData;
      const populatedBoard = data.board.map((tile) => ({
        ...tile,
        letter: tile.prePlacedLetter,
      }));
      setBoard(populatedBoard);
      setLetters(data.extraLetters.map((l) => ({ ...l, used: false })));
    };

    loadGameData();
  }, []);

  const handleSubmit = () => {
    // Step 1: Check if any tiles are placed
    const placedTiles = board.filter((tile) => tile.letter && !tile.prePlacedLetter);
    if (placedTiles.length === 0) {
      alert("You must place at least one letter on the board.");
      return;
    }

    // Step 2: Check adjacency
    if (!checkAdjacency(board)) {
      alert("All placed tiles must be adjacent to another letter.");
      return;
    }

    // Step 3: Validate words
    const words = validateWords(board, fakeBackendData.validWords);
    if (words.invalid.length > 0) {
      alert(`Invalid words: ${words.invalid.join(", ")}`);
      return;
    }

    // Step 4: Calculate score
    const { totalPoints, unusedLetters } = calculateScore(board, letters);
    setStats({
      words: words.valid,
      points: totalPoints,
      unused: unusedLetters,
    });
    setIsGameOver(true); // Trigger the modal
  };

  const handlePlayAgain = () => {
    setIsGameOver(false);
    // Reset state (can reload the board/letters here)
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Poppins, sans-serif" }}>
      <h1 style={{ color: "#4ade80" }}>Word Path Challenge</h1>
      <Board board={board} setBoard={setBoard} />
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
      {isGameOver && (
        <GameEndModal
          isOpen={isGameOver}
          onClose={handlePlayAgain}
          stats={stats}
        />
      )}
    </div>
  );
};

export default App;
